'use client'

import { Button, Card } from 'flowbite-react'
import Stars from '../../../../components/Stars'
import CardSkeleton from '../../../../components/Skeletons/CardSkeleton'
import { UserRecipe } from '@/types/recipe/recipe.types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { basicTheme } from '@/lib/flowbite/themes/basicTheme'

type RecipeCardProps = {
  recipe: UserRecipe
  loading: boolean
  className?: string
}

const RecipeCard = ({ recipe, loading, className }: RecipeCardProps) => {
  const pathname = usePathname()
  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        <Card
          theme={basicTheme.cocktail}
          className={`${className}`}
          imgAlt="Cocktail Image"
          imgSrc={recipe.image_url ?? undefined}
        >
          <section>
            {/* 칵테일 이름 */}
            <h5 className="text-3xl font-semibold tracking-tight dark:text-white">
              {recipe.name}
            </h5>
            {/* ⭐️ stars */}
            <Stars rating={0} />

            <div className="flex items-center justify-between">
              {/* 등록한 사람 */}
              <span className="text-xl font-bold dark:text-white">
                {recipe.userinfo?.name ?? '유저 정보 없음'}
              </span>
              {/* 레시피 보기 버튼 */}
              <Button
                theme={basicTheme.button}
                color="primary"
                className="ml-auto"
              >
                <Link href={`${pathname}/${recipe.id}`}>레시피 보기</Link>
              </Button>
            </div>
          </section>
        </Card>
      )}
    </>
  )
}

export default RecipeCard
