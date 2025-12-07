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
import { PostCreateInput } from '../../_types/post-create-form.schemes'
import { useFormContext } from 'react-hook-form'
import FormFileInput from '@/components/ui/forms/FormFileInput'
import { useState } from 'react'

export default function PostInputs() {
  const [isEventChecked, setIsEventChecked] = useState<boolean>(true)
  const { register, setValue, trigger, watch } =
    useFormContext<PostCreateInput>()

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
      </FormItem>
      <FormItem label="내용" required>
        <Textarea
          {...register('content')}
          color="primary"
          placeholder="자세한 내용을 입력해주세요"
        />
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
        <FormFileInput
          registeration={register('postImages')}
          setValue={setValue}
          trigger={trigger}
        />
      </FormItem>
    </Card>
  )
}
