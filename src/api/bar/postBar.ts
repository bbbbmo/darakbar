import { BarRegisterForm } from '@/app/(main)/bar-register/_components/BarRegister.schemes'
import supabase from '@lib/supabase/supabase'

export const postBar = async (body: BarRegisterForm) => {
  const { data, error } = await supabase.rpc('create_bar_with_detail', {
    // 바 기본 정보 테이블
    p_name: body.name,
    p_address: body.address,
    p_website_url: body.websiteUrl,
    p_instagram_url: body.instagramUrl,
    p_description: body.description,
    p_phone_number: body.phoneNumber,
    p_bar_images: [], // 나중에 업데이트
    // signature_menus 테이블
    p_signature_cocktails: body.signatureCocktails.map((cocktail) => ({
      ...cocktail,
      image: null, // 나중에 업데이트
    })),
    // business_hours 테이블
    p_business_hours: body.businessHours,
    // bar_tags 테이블
    p_atmosphere_tag_ids: body.atmosphereTagIds,
  })
}
