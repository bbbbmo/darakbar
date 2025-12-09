import FormItem from '@/components/ui/forms/FormItem'
import FormOption from '@/components/ui/forms/FormOption'
import SubTitleText from '@/components/ui/text/SubTitleText'
import { Button, Card, Textarea, TextInput } from 'flowbite-react'
import { menuTypeOptions } from '../../_const/menu-type.cont'
import { PostForm } from '../../_types/form.schemes'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import FormFileInput from '@/components/ui/forms/FormFileInput'
import { HiPlus } from 'react-icons/hi'
import { newMenuDefaultValues } from '../../_const/form.const'
import RemoveButton from '@/components/ui/buttons/RemoveButton'
import { FaWonSign } from 'react-icons/fa6'
import FormErrorMessage from '@/components/ui/forms/FormErrorMessage'

export default function NewMenuInputs() {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<PostForm>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'newMenus',
  })

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id}>
          <Card>
            <div className="flex items-center justify-between">
              <SubTitleText title={`메뉴 정보 ${index + 1}`} />
              <RemoveButton onClick={() => remove(index)} />
            </div>
            <FormItem label="메뉴 유형" required>
              <FormOption
                options={menuTypeOptions}
                setOption={(option) =>
                  setValue(`newMenus.${index}.type`, option)
                }
              />
              <FormErrorMessage error={errors.newMenus?.[index]?.type} />
            </FormItem>
            <FormItem label="메뉴 이름" required>
              <TextInput
                type="text"
                color="primary"
                placeholder="메뉴 이름을 입력해주세요"
                {...register(`newMenus.${index}.name`)}
              />
              <FormErrorMessage error={errors.newMenus?.[index]?.name} />
            </FormItem>
            <FormItem label="메뉴 설명" required>
              <Textarea
                color="primary"
                placeholder="메뉴 설명을 입력해주세요"
                {...register(`newMenus.${index}.description`)}
              />
              <FormErrorMessage error={errors.newMenus?.[index]?.description} />
            </FormItem>
            <FormItem label="메뉴 가격" required>
              <TextInput
                type="number"
                color="primary"
                min={0}
                step={1000}
                rightIcon={FaWonSign}
                placeholder="메뉴 가격을 입력해주세요"
                {...register(`newMenus.${index}.price`, {
                  valueAsNumber: true,
                })}
              />
              <FormErrorMessage error={errors.newMenus?.[index]?.price} />
            </FormItem>
            <FormItem label="메뉴 이미지" required>
              <Controller
                name={`newMenus.${index}.newMenuImage`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormFileInput value={value} onChange={onChange} />
                )}
              />
            </FormItem>
          </Card>
        </div>
      ))}

      <Button
        type="button"
        className="flex items-center gap-2"
        onClick={() => append(newMenuDefaultValues)}
      >
        <HiPlus /> 메뉴 추가
      </Button>
    </>
  )
}
