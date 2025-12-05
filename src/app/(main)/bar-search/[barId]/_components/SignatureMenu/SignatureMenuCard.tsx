import SubTitleText from '@/components/ui/text/SubTitleText'
import Tags from '@/components/ui/Tags'
import { useParseFile } from '@/hooks/useParseFile'
import { BarDetail } from '@api/bar/getBarDetail'
import { Card } from 'flowbite-react'
import Image from 'next/image'

type SignatureMenuCardProps = {
  menu: NonNullable<BarDetail>['signature_menus'][0]
}

export default function SignatureMenuCard({ menu }: SignatureMenuCardProps) {
  const { publicUrls } = useParseFile(menu.image_path || '')

  // 더 엄격한 URL 검증
  const isValidUrl =
    typeof publicUrls === 'string' &&
    publicUrls.trim() !== '' &&
    publicUrls.includes('darakbar-storage') &&
    publicUrls.includes('.') // 파일 확장자가 있는지 확인

  return (
    <Card
      className="relative! transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-103"
      key={menu.id}
      renderImage={() =>
        isValidUrl ? (
          <div className="relative aspect-[2/1] w-full">
            <Image
              src={publicUrls}
              alt={menu.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-t-lg object-cover"
            />
          </div>
        ) : (
          <div className="relative flex aspect-[2/1] w-full items-center justify-center rounded-t-lg bg-gray-200">
            <span className="text-gray-500">이미지 없음</span>
          </div>
        )
      }
    >
      <div className="flex flex-col gap-8">
        <div className="flex justify-between gap-4 font-semibold">
          <div className="flex flex-col gap-2">
            <SubTitleText title={menu.name} />
            <p className="text-md text-zinc-500">{menu.description}</p>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-1">
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
