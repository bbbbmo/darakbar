import { Card } from 'flowbite-react'
import { NewMenu } from './post.mocks'

export type NewMenuCardProps = {
  menu: NewMenu
}

export default function NewMenuCard({ menu }: NewMenuCardProps) {
  return (
    <Card className="bg-secondary">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">{menu.name}</h4>
          <span className="text-sm text-zinc-500">{menu.type}</span>
        </div>
        <span className="text-lg font-semibold">
          {menu.price.toLocaleString()}원
        </span>
      </div>
      <p>
        <span className="line-clamp-1">{menu.description}</span>
      </p>
      <img
        src={menu.image}
        alt={menu.name}
        className="h-80 w-full object-cover"
      />
    </Card>
  )
}
