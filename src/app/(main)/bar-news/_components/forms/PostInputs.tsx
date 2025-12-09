'use client'

import FormItem from '@/components/ui/forms/FormItem'
import SubTitleText from '@/components/ui/text/SubTitleText'
import {
  Card,
  Checkbox,
  Datepicker,
  Label,
  Textarea,
  TextInput,
} from 'flowbite-react'
import { PostForm } from '../../_types/form.schemes'
import { Controller, useFormContext } from 'react-hook-form'
import FormFileInput from '@/components/ui/forms/FormFileInput'
import { useEffect, useState } from 'react'
import FormErrorMessage from '@/components/ui/forms/FormErrorMessage'

export default function PostInputs() {
  const [isEventChecked, setIsEventChecked] = useState<boolean>(true)
  const {
    register,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useFormContext<PostForm>()

  useEffect(() => {
    if (!isEventChecked) {
      setValue('eventStartDate', null as any)
      setValue('eventEndDate', null as any)
    } else {
      setValue('eventStartDate', new Date())
      setValue('eventEndDate', new Date())
    }
  }, [isEventChecked])

  return (
    <Card>
      <SubTitleText title="게시글 정보" />
      <FormItem label="제목" required>
        <TextInput
          {...register('title')}
          type="text"
          color="primary"
          placeholder="제목을 입력해주세요"
        />
        <FormErrorMessage error={errors.title} />
      </FormItem>
      <FormItem label="내용" required>
        <Textarea
          {...register('content')}
          color="primary"
          placeholder="자세한 내용을 입력해주세요"
        />
        <FormErrorMessage error={errors.content} />
      </FormItem>
      <FormItem label="기간">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Datepicker
              color="primary"
              language="ko"
              labelTodayButton="오늘"
              labelClearButton="초기화"
              weekStart={1}
              title="이벤트 시작일"
              disabled={!isEventChecked}
              value={watch('eventStartDate')}
              onChange={(date: Date | null) =>
                setValue('eventStartDate', date ?? new Date())
              }
            />
            <span> ~ </span>
            <Datepicker
              color="primary"
              language="ko"
              labelTodayButton="오늘"
              labelClearButton="초기화"
              weekStart={1}
              title="이벤트 종료일"
              disabled={!isEventChecked}
              value={watch('eventEndDate')}
              onChange={(date: Date | null) =>
                setValue('eventEndDate', date ?? new Date())
              }
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Checkbox
              id="event"
              checked={isEventChecked}
              onChange={() => setIsEventChecked(!isEventChecked)}
            />
            <Label htmlFor="event" className="text-gray-100">
              기간 입력
            </Label>
          </div>
        </div>
      </FormItem>
      <FormItem label="이미지" required>
        <Controller
          name="postImages"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormFileInput value={value} onChange={onChange} multiple={true} />
          )}
        />
      </FormItem>
    </Card>
  )
}
