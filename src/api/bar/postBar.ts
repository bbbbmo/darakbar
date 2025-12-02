import { BarRegisterForm } from '@/app/(main)/bar-register/_components/BarRegister.schemes'
import supabase from '@lib/supabase/supabase'
import {
  getBarImagePath,
  getSignatureCocktailImagePath,
} from '../file/getStoragePath'
import { uploadFiles } from '../file/storage'
import z from 'zod'

const PostBarResultSchema = z.object({
  success: z.boolean(),
  bar_id: z.number().nullable(),
  error: z.string().optional(),
})

export type PostBarResult = z.infer<typeof PostBarResultSchema>

export const postBar = async (
  body: BarRegisterForm,
): Promise<PostBarResult> => {
  // 1. 바 기본 정보 생성 (이미지 없이)
  const { data, error } = await supabase.rpc('create_bar_with_detail', {
    // 바 기본 정보 테이블
    p_name: body.name,
    p_address: body.address,
    p_description: body.description,
    p_phone_number: body.phoneNumber,
    p_website_url: body.websiteUrl ?? undefined,
    p_instagram_url: body.instagramUrl ?? undefined,
    p_bar_images: [], // 이미지는 별도로 업로드 후 업데이트
    // bar_tags 테이블
    p_atmosphere_tag_ids: body.atmosphereTagIds,
    // signature_menus 테이블
    p_signature_cocktails:
      body.signatureCocktails.map((cocktail) => ({
        ...cocktail,
        image: null, // 나중에 업데이트
      })) || null,
    // business_hours 테이블
    p_business_hours: body.businessHours,
  })

  if (error) {
    throw error
  }

  // RPC 함수가 JSONB로 에러를 반환하는 경우 처리
  if (data && typeof data === 'object' && 'success' in data && !data.success) {
    const errorMessage =
      (data as { error?: string }).error || '바 등록 중 오류가 발생했습니다.'
    const postgrestError = {
      message: errorMessage,
      details: '',
      hint: '',
      code: 'PGRST301',
    } as const
    throw postgrestError
  }

  // 2. 생성된 바 ID 추출
  const barId =
    data && typeof data === 'object' && 'bar_id' in data
      ? (data as { bar_id: number }).bar_id
      : undefined

  if (!barId) {
    throw new Error('바 ID를 가져올 수 없습니다.')
  }

  // 3. 이미지 업로드 및 데이터베이스 업데이트
  await uploadAndUpdateBarImages(barId, body)

  // 성공 결과 반환
  return {
    success: true,
    bar_id: barId,
  }
}

/**
 * @description 바 이미지와 칵테일 이미지를 업로드하고 데이터베이스에 업데이트
 * @param barId 바 ID
 * @param body 폼 데이터
 */
const uploadAndUpdateBarImages = async (
  barId: number,
  body: BarRegisterForm,
) => {
  try {
    const barImagePath = getBarImagePath(barId)
    const cocktailImagePath = getSignatureCocktailImagePath(barId)

    // 바 이미지 업로드
    let barImagePaths: string[] = []
    if (body.barImages && body.barImages.length > 0) {
      const validBarImages = body.barImages.filter(
        (file): file is File => file instanceof File,
      )
      if (validBarImages.length > 0) {
        barImagePaths = await uploadFiles(validBarImages, barImagePath)
      }
    }

    // 칵테일 이미지 업로드
    const cocktailImagePaths: string[] = []
    const validCocktailImages =
      body.signatureCocktails
        .map((cocktail) => cocktail.image)
        .filter((file): file is File => file instanceof File) || null

    if (validCocktailImages && validCocktailImages.length > 0) {
      const uploadedPaths = await uploadFiles(
        validCocktailImages,
        cocktailImagePath,
      )
      cocktailImagePaths.push(...uploadedPaths)
    }
    // 바 이미지 업데이트
    if (barImagePaths.length > 0) {
      const { error: barUpdateError } = await supabase
        .from('bars')
        .update({ bar_images: barImagePaths })
        .eq('id', barId)

      if (barUpdateError) {
        throw new Error(`바 이미지 업데이트 실패: ${barUpdateError.message}`)
      }
    }

    // 시그니처 칵테일 이미지 업데이트
    if (cocktailImagePaths.length > 0) {
      // 해당 바의 시그니처 메뉴들을 순서대로 가져오기
      const { data: signatureMenus, error: fetchError } = await supabase
        .from('signature_menus')
        .select('id')
        .eq('bar_id', barId)
        .order('id', { ascending: true })

      if (fetchError) {
        throw new Error(`시그니처 메뉴 조회 실패: ${fetchError.message}`)
      }

      // 각 시그니처 메뉴에 이미지 업데이트 (순서대로 매핑)
      if (signatureMenus) {
        const updatePromises = signatureMenus
          .slice(0, cocktailImagePaths.length)
          .map((menu, index) =>
            supabase
              .from('signature_menus')
              .update({ image: cocktailImagePaths[index] })
              .eq('id', menu.id),
          )

        const updateResults = await Promise.all(updatePromises)
        const updateErrors = updateResults
          .map((result) => result.error)
          .filter((error): error is NonNullable<typeof error> => error !== null)

        if (updateErrors.length > 0) {
          throw new Error(
            `시그니처 칵테일 이미지 업데이트 실패: ${updateErrors[0].message}`,
          )
        }
      }
    }
  } catch (error) {
    throw new Error(
      `이미지 업로드 및 업데이트 중 오류 발생: ${
        error instanceof Error ? error.message : '알 수 없는 오류'
      }`,
    )
  }
}
