import SubTitleText from '@/components/SubTitleText'
import Tags from '@/components/Tags'
import { BarDetail } from '@/lib/supabase/api/bar/getBarDetail'
import { Card } from 'flowbite-react'
import Image from 'next/image'

type SignatureMenuCardProps = {
  menu: NonNullable<BarDetail>['signature_menus'][0]
}

export default function SignatureMenuCard({ menu }: SignatureMenuCardProps) {
  return (
    <Card
      className="relative! transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-103"
      key={menu.id}
      renderImage={() =>
        menu.image && (
          <Image
            src={menu.image}
            alt={menu.name}
            fill
            className="h-auto object-cover"
          />
        )
      }
    >
      <div className="flex flex-col gap-8">
        <div className="flex justify-between font-semibold">
          <div className="flex flex-col gap-2">
            <SubTitleText title={menu.name} />
            <p className="text-md text-zinc-500">{menu.description}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl text-amber-400">
              ₩ {menu.price.toLocaleString()}
            </span>
            <span className="text-md ml-auto text-zinc-500">
              {`${menu.abv != null ? `${menu.abv}% ABV` : '미제공'}`}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-md mb-2 font-semibold">재료</h3>
          <Tags
            tags={menu.signature_menu_ingredients?.map(
              (ingredient) => ingredient.ingredients,
            )}
          />
        </div>
      </div>
    </Card>
  )
}
