'use client'

import FormDescription from '@/components/Forms/FormDescription'
import FormFileInput from '@/components/Forms/FormFileInput'
import FormHeader from '@/components/Forms/FormHeader'
import FormItem from '@/components/Forms/FormItem'
import { barCategoryOptions } from '@/const/bar-options.const'
import FormOption from '@/components/Forms/FormOption'
import Tags from '@/components/Tags'
import { useQuery } from '@tanstack/react-query'
import { getAtmosphereTags } from '@/lib/supabase/api/tag/getAtmosphereTags'
import { TextInput } from 'flowbite-react'
import NextButton from '@/components/Buttons/NextButton'
import { useFormContext } from 'react-hook-form'
import { BarRegisterForm } from '../BarRegister.schemes'
import FormErrorMessage from '@/components/Forms/FormErrorMessage'
import PrevButton from '@/components/Buttons/PrevButton'

type BarDetailInfoProps = {
  onPrevStep: () => void
  onNextStep: () => void
}

export default function BarDetailInfo(props: BarDetailInfoProps) {
  const { onPrevStep, onNextStep } = props
  const { data: atmosphereTags } = useQuery({
    queryKey: ['atmosphere-tags'],
    queryFn: getAtmosphereTags,
  })
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<BarRegisterForm>()
  return (
    <>
      <FormHeader title="상세 정보 입력" />
      <FormDescription>바의 상세 정보를 입력해주세요.</FormDescription>
      <FormItem label="바 이미지" required>
        <FormFileInput
          registeration={register('barImages')}
          setValue={setValue}
          trigger={trigger}
        />
      </FormItem>
      <FormItem label="바 카테고리" required>
        <FormOption
          options={barCategoryOptions}
          setOption={(option) => setValue('category', option)}
        />
        <FormErrorMessage error={errors.category} />
      </FormItem>
      <FormItem label="바 분위기" required>
        <Tags
          tags={atmosphereTags?.data || []}
          active={true}
          setTagIds={(tagIds) => setValue('atmosphereTagIds', tagIds)}
        />
      </FormItem>
      <FormItem label="인스타그램">
        <TextInput
          type="text"
          color="primary"
          placeholder="https://www.instagram.com/example"
          {...register('instagramUrl')}
          aria-invalid={!!errors.instagramUrl}
        />
        <FormErrorMessage error={errors.instagramUrl} />
      </FormItem>
      <FormItem label="웹사이트">
        <TextInput
          type="text"
          color="primary"
          placeholder="https://www.example.com"
          {...register('websiteUrl')}
          aria-invalid={!!errors.websiteUrl}
        />
        <FormErrorMessage error={errors.websiteUrl} />
      </FormItem>
      <div className="mt-5 flex justify-between">
        <PrevButton text="이전 단계로 이동" onClick={onPrevStep} />
        <NextButton text="다음 단계로 이동" onClick={onNextStep} />
      </div>
    </>
  )
}
