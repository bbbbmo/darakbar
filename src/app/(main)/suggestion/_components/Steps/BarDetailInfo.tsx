'use client'

import FormDescription from '@/components/ui/forms/FormDescription'
import FormFileInput from '@/components/ui/forms/FormFileInput'
import FormHeader from '@/components/ui/forms/FormHeader'
import FormItem from '@/components/ui/forms/FormItem'
import Tags from '@/components/ui/Tags'
import { useQuery } from '@tanstack/react-query'
import { TextInput } from 'flowbite-react'
import NextButton from '@/components/ui/buttons/NextButton'
import { Controller, useFormContext } from 'react-hook-form'
import { BarRegisterForm } from '../BarRegister.schemes'
import FormErrorMessage from '@/components/ui/forms/FormErrorMessage'
import PrevButton from '@/components/ui/buttons/PrevButton'
import { tagKeys } from '@/api/queries/tagKeys'

type BarDetailInfoProps = {
  onPrevStep: () => void
  onNextStep: () => void
}

export default function BarDetailInfo(props: BarDetailInfoProps) {
  const { onPrevStep, onNextStep } = props
  const { data: atmosphereTags } = useQuery(tagKeys.atmospheres)
  const {
    register,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useFormContext<BarRegisterForm>()

  const atmosphereTagIds = watch('atmosphereTagIds')

  return (
    <>
      <FormHeader title="상세 정보 입력" />
      <FormDescription>바의 상세 정보를 입력해주세요.</FormDescription>
      <FormItem label="바 이미지" required>
        <Controller
          name="barImages"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormFileInput value={value} onChange={onChange} multiple={true} />
          )}
        />
      </FormItem>
      <FormItem label="바 분위기" required>
        <Tags
          tags={atmosphereTags?.data || []}
          active={true}
          existingTagIds={atmosphereTagIds}
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
