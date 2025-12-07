'use client'

import { queries } from '@/api/queries'
import FormItem from '@/components/ui/forms/FormItem'
import { useQuery } from '@tanstack/react-query'
import { Card, Select } from 'flowbite-react'

export default function PostTypeSelect() {
  const { data: postTypes } = useQuery(queries.tag.posts)

  return (
    <Card>
      <FormItem label="게시글 유형" required>
        <Select color="primary">
          {postTypes?.data.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </Select>
      </FormItem>
    </Card>
  )
}
