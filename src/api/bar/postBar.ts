import { BarRegisterForm } from '@/app/(main)/bar-register/_components/BarRegister.schemes'
import supabase from '@lib/supabase/supabase'

export const postBar = async (body: BarRegisterForm) => {
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
    p_signature_cocktails: body.signatureCocktails.map((cocktail) => ({
      ...cocktail,
      image: null, // 나중에 업데이트
    })),
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

  return { data }
}
