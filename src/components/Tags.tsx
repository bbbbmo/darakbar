import { Badge } from 'flowbite-react'

type Tag = {
  id: number
  name: string
}

type TagsProps = {
  tags: Tag[]
  active?: boolean
  setTagIds?: (tagIds: number[]) => void
}

export default function Tags({ tags, active = false, setTagIds }: TagsProps) {
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

  return (
    <span className="flex flex-row gap-2">
      {tags.map((tag: Tag, index) => {
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
