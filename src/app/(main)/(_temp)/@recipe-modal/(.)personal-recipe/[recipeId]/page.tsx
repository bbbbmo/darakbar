import RecipeModal from '@/app/(main)/_components/RecipeModal/RecipeModal'

type PersonalRecipeModalProps = {
  params: Promise<{
    recipeId: string
  }>
}

export default async function PersonalRecipeModal({
  params,
}: PersonalRecipeModalProps) {
  const { recipeId } = await params

  if (!recipeId) return null

  return (
    <>
      <RecipeModal id={parseInt(recipeId)} />;
    </>
  )
}
