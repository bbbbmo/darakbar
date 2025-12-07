'use client'

import FormItem from '@/components/ui/forms/FormItem'
import { Card, Select } from 'flowbite-react'
import { Controller, useFormContext } from 'react-hook-form'
import { PostCreateInput } from '../../_types/post-create-form.schemes'
import FormErrorMessage from '@/components/ui/forms/FormErrorMessage'
import { Tag } from '@/types/default.schemes'

type PostTypeSelectProps = {
  postTypes: Tag[]
}

export default function PostTypeSelect({ postTypes }: PostTypeSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<PostCreateInput>()

  return (
    <Card>
      <FormItem label="게시글 유형" required>
        <Controller
          name="postTypeId"
          control={control}
          render={({ field }) => (
            <Select
              color="primary"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
            >
              {postTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Select>
          )}
        />
        <FormErrorMessage error={errors.postTypeId} />
      </FormItem>
    </Card>
  )
}
