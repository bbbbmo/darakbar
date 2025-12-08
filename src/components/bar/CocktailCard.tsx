import { SignatureCocktail } from '@/api/signature-menu/getSignatureCocktails'
import CardSkeleton from '@/components/ui/skeletons/CardSkeleton'
import SubTitleText from '@/components/ui/text/SubTitleText'
import Tags from '@/components/ui/Tags'
import { useParseFile } from '@/hooks/useParseFile'
import { basicTheme } from '@/lib/flowbite/basicTheme'
import { Card } from 'flowbite-react'
import Image from 'next/image'

type CocktailCardProps = {
  menu: SignatureCocktail
  loading: boolean
  className?: string
}

export default function CocktailCard({
  menu,
  loading,
  className,
}: CocktailCardProps) {
  const { publicUrls } = useParseFile(menu.image_path)

  const isValidUrl =
    typeof publicUrls === 'string' &&
    publicUrls.trim() !== '' &&
    publicUrls.includes('darakbar-storage') &&
    publicUrls.includes('.')

  if (loading) return <CardSkeleton />

  return (
    <Card
      theme={basicTheme.bar}
      className={`${className}`}
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
