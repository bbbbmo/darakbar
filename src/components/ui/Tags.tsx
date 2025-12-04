import { Tag } from '@/types/default.schemes'
import clsx from 'clsx'
import { Badge } from 'flowbite-react'
import { useEffect, useState } from 'react'

type TagsProps = {
  tags: Tag[]
  active?: boolean
  existingTagIds?: number[]
  setTagIds?: (tagIds: number[]) => void
}

export default function Tags({
  tags,
  active = false,
  existingTagIds,
  setTagIds,
}: TagsProps) {
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
  const colors = [
    'failure',
    'indigo',
    'success',
    'warning',
    'info',
    'Dark',
    'pink',
    'purple',
  ]

  useEffect(() => {
    if (existingTagIds && existingTagIds.length > 0) {
      setSelectedTagIds(existingTagIds)
    }
  }, [existingTagIds])

  const handleTagClick = (tagId: number) => {
    let newSelectedTagIds: number[]

    if (selectedTagIds.includes(tagId)) {
      // 이미 선택된 태그면 제거
      newSelectedTagIds = selectedTagIds.filter((id) => id !== tagId)
    } else {
      // 최대 5개까지만 선택 가능
      if (selectedTagIds.length >= 5) {
        return
      }
      // 새로운 태그 추가
      newSelectedTagIds = [...selectedTagIds, tagId]
    }

    setSelectedTagIds(newSelectedTagIds)
    setTagIds?.(newSelectedTagIds)
  }

  return (
    <span className="flex flex-row flex-wrap gap-2">
      {active
        ? tags.map((tag: Tag) => {
            const isSelected = selectedTagIds.includes(tag.id)
            return (
              <Badge
                key={tag.id}
                color="gray"
                className={clsx(
                  isSelected &&
                    `scale-105 bg-amber-400 opacity-100 shadow-md hover:bg-amber-500`,
                )}
                onClick={() => handleTagClick(tag.id)}
              >
                {tag.name}
              </Badge>
            )
          })
        : tags.map((tag: Tag, index) => {
            const color = colors[index % colors.length]
            return (
              <Badge key={tag.id} color={color}>
                {tag.name}
              </Badge>
            )
          })}
    </span>
  )
}
