import { Recipe, RecipeIngredient } from '@/types/recipe/recipe.types'
import supabase from '@lib/supabase/supabase'
import {
  CreateRecipeForm,
  CreateRecipeFormSchema,
} from '@/app/(main)/(_temp)/personal-recipe/_components/RecipeCreateModal/RecipeCreateModal.schemes'
import { uploadFile } from '@/api/file/storage'

export const getRecipes = async (userId?: string) => {
  let query = supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })

  if (userId) {
    query = query.eq('user_id', userId).eq('is_user_recipe', true)
  }

  const { data, error } = await query
  return { data, error }
}

/**
 * @description 재료 조회
 * @returns 재료 데이터
 */
export const getIngredients = async (name?: string) => {
  let query = supabase.from('ingredients').select('*')

  if (name) {
    query = query.eq('name', name)
  }

  const { data, error } = await query
  return { data, error }
}

/**
 * @description 유저 레시피 생성
 * @param recipe 레시피 데이터
 * @returns 레시피 데이터
 */
type UserRecipeInput = {
  name: string
  glassType: string | null
  instructions: string
  description: string
  imageUrl: string | null
}

export const createUserRecipe = async (
  recipeData: UserRecipeInput,
  userId: string,
) => {
  const { data, error } = await supabase
    .from('recipes')
    .insert({
      user_id: userId,
      name: recipeData.name,
      glass_type: recipeData.glassType,
      instructions: recipeData.instructions,
      description: recipeData.description,
      image_url: recipeData.imageUrl,
      is_user_recipe: true,
    })
    .select('*')
    .single()
  return { data, error }
}

/**
 * @description 재료 생성
 * @param ingredients 재료 데이터
 * @returns 재료 데이터
 */
export const createIngredient = async (name: string) => {
  const { data, error } = await supabase
    .from('ingredients')
    .insert({
      name: name,
    })
    .select('*')
    .single()
  return { data, error }
}

/**
 * @description 레시피-재료 연결 생성
 * @param recipeIngredients 레시피-재료 데이터
 * @returns 레시피-재료 데이터
 */
export const createRecipeIngredients = async (
  recipeIngredients: RecipeIngredient,
) => {
  const { data, error } = await supabase
    .from('recipe_ingredients')
    .insert({
      recipe_id: recipeIngredients.recipe_id,
      ingredient_id: recipeIngredients.ingredient_id,
      amount: recipeIngredients.amount,
      unit: recipeIngredients.unit,
      is_base_liquor: recipeIngredients.is_base_liquor,
    })
    .select('*')
    .single()
  return { data, error }
}

/**
 * @description 완전한 유저 레시피 생성 (트랜잭션 포함)
 * @param recipeData 레시피 기본 정보
 * @param ingredients 재료 목록
 * @param userId 유저 ID
 * @returns 생성된 레시피 데이터
 */
type IngredientInput = {
  name: string
  amount: number
  unit: string
  isBaseLiquor: boolean
}
export const createCompleteUserRecipe = async (
  recipeData: UserRecipeInput,
  ingredients: IngredientInput[],
  userId: string,
) => {
  try {
    // 1. 레시피 기본 정보 생성
    const { data: recipe, error: recipeError } = await createUserRecipe(
      recipeData,
      userId,
    )

    if (recipeError) throw recipeError

    // 2. 재료 처리 및 연결
    const recipeIngredients = []

    for (const ingredient of ingredients) {
      // 재료가 존재하는지 확인
      let { data: existingIngredient } = await supabase
        .from('ingredients')
        .select('*')
        .eq('name', ingredient.name)
        .single()

      // 재료가 없으면 생성
      if (!existingIngredient) {
        const { data: newIngredient, error: createError } =
          await createIngredient(ingredient.name)

        if (createError) throw createError
        existingIngredient = newIngredient
      }

      // 레시피-재료 연결 생성
      const { data: recipeIngredient, error: linkError } =
        await createRecipeIngredients({
          recipe_id: recipe!.id,
          ingredient_id: existingIngredient!.id,
          amount: ingredient.amount,
          unit: ingredient.unit,
          is_base_liquor: ingredient.isBaseLiquor,
        })

      if (linkError) throw linkError
      recipeIngredients.push(recipeIngredient)
    }

    return {
      recipe,
      ingredients: recipeIngredients,
      error: null,
    }
  } catch (error) {
    return {
      recipe: null,
      ingredients: null,
      error,
    }
  }
}

/**
 * @description 유저 레시피 조회 (재료 포함)
 * @param userId 유저 ID
 * @returns 유저 레시피 목록
 */
export const getUserRecipesWithIngredients = async (userId: string) => {
  const { data, error } = await supabase
    .from('recipes')
    .select(
      `
      *,
      recipe_ingredients (
        amount,
        unit,
        is_base_liquor,
        ingredients (
          id,
          name
        )
      ),
       userinfo (
        name,
        profile_img_url
      )
    `,
    )
    .eq('user_id', userId)
    .eq('is_user_recipe', true)
    .order('created_at', { ascending: false })

  return { data, error }
}

/**
 * @description 레시피 ID로 상세 정보 조회
 * @param recipeId 레시피 ID
 * @returns 레시피 상세 정보
 */
export const getRecipeById = async (recipeId: number) => {
  const { data, error } = await supabase
    .from('recipes')
    .select(
      `
      *,
      recipe_ingredients (
        amount,
        unit,
        is_base_liquor,
        ingredients (
          name
        )
      ),
      userinfo (
        name,
        profile_img_url
      )
    `,
    )
    .eq('id', recipeId)
    .single()

  return { data, error }
}

/**
 * @description 레시피 수정
 * @param recipeId 레시피 ID
 * @param updateData 수정할 데이터
 * @returns 수정된 레시피
 */
export const updateRecipe = async (
  recipeId: number,
  updateData: Partial<Recipe>,
) => {
  const { data, error } = await supabase
    .from('recipes')
    .update(updateData)
    .eq('id', recipeId)
    .select('*')
    .single()

  return { data, error }
}

/**
 * @description 레시피 삭제
 * @param recipeId 레시피 ID
 * @returns 삭제 결과
 */
export const deleteRecipe = async (recipeId: number) => {
  // 먼저 연결된 재료들을 삭제
  await supabase.from('recipe_ingredients').delete().eq('recipe_id', recipeId)

  // 레시피 삭제
  const { data, error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', recipeId)

  return { data, error }
}

/**
 * @description Zod 스키마를 활용한 유효성 검증 및 유저 레시피 생성
 * @param formData 폼 데이터
 * @param userId 유저 ID
 * @returns 생성된 레시피 데이터
 */
export const createValidatedUserRecipe = async (
  formData: CreateRecipeForm,
  userId: string,
) => {
  try {
    // Zod 스키마로 유효성 검증
    const validatedData = CreateRecipeFormSchema.parse(formData)

    // 재료 데이터 변환
    const ingredients = validatedData.ingredients.map((ingredient) => ({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
      isBaseLiquor: ingredient.is_base_liquor,
    }))

    // 이미지 업로드 처리
    let imageUrl: string | null = null
    if (validatedData.image) {
      const filePath = `${userId}/cocktails/${formData?.image?.name}`
      const { path: publicUrl } = await uploadFile(
        validatedData.image,
        filePath,
      )
      imageUrl = publicUrl ?? null
    }

    // 레시피 데이터 변환
    const recipeData = {
      name: validatedData.name,
      glassType: validatedData.glassType ?? null,
      instructions: validatedData.instructions,
      description: validatedData.description,
      imageUrl,
    }

    return await createCompleteUserRecipe(recipeData, ingredients, userId)
  } catch (error) {
    return {
      recipe: null,
      ingredients: null,
      error,
    }
  }
}

/**
 * @description MCP를 활용한 레시피 통계 조회
 * @param userId 유저 ID
 * @returns 레시피 통계 정보
 */
export const getRecipeStats = async (userId: string) => {
  try {
    // 유저의 총 레시피 수
    const { count: totalRecipes } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_user_recipe', true)

    // 사용된 재료 통계
    const { data: userRecipes } = await supabase
      .from('recipes')
      .select('id')
      .eq('user_id', userId)
      .eq('is_user_recipe', true)

    const recipeIds = userRecipes?.map((recipe: any) => recipe.id) || []

    const { data: ingredientStats } = await supabase
      .from('recipe_ingredients')
      .select(
        `
        ingredients (name),
        is_base_liquor
      `,
      )
      .in('recipe_id', recipeIds)

    return {
      totalRecipes,
      ingredientStats,
      error: null,
    }
  } catch (error) {
    return {
      totalRecipes: 0,
      ingredientStats: null,
      error,
    }
  }
}
