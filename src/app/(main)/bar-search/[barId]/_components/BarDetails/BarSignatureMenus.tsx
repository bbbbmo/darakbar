'use client'

import SubTitleText from '@/components/SubTitleText'
import Tags from '@/components/Tags'
import TitleText from '@/components/TitleText'
import { Bar } from '@/types/bar/bar.types'
import { Card } from 'flowbite-react'
import Image from 'next/image'
import { LiaCocktailSolid } from 'react-icons/lia'

export default function BarSignatureMenus({ bar }: { bar: Bar }) {
  return (
    <>
      <TitleText
        icon={<LiaCocktailSolid size={40} className="text-amber-400" />}
        title="시그니처 칵테일"
      />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {bar.signature_menus.map((menu: any) => (
          <Card
            className="relative!"
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
                    {menu.abv}% ABV
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-md mb-2 font-semibold">재료</h3>
                <Tags
                  tags={menu.ingredients.map(
                    (ingredient: any) => ingredient.name,
                  )}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
