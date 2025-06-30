import { useEffect } from "react";
import { showConfetti } from "../../../../utils/showConfetti";
import FormDescription from "../../../Form/FormDescription";
import { useRecipeCreateStore } from "../_stores/recipeCreateStore";
import supabase from "../../../../supabase";
import { CreateRecipeForm } from "../types/create-form.type";

// TODO: 레시피 등록, 이미지 등록, 유저 정보 캐싱 추가
type SuccessCreateProps = {
  setSubmitHandler: (handler: () => void) => void;
};

/**
 * @description 칵테일 등록 완료 화면
 */
export default function SuccessCreate({
  setSubmitHandler,
}: SuccessCreateProps) {
  const { getAllForm } = useRecipeCreateStore();

  const fetchUserProfile = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  };

  useEffect(() => {
    showConfetti(5000);

    // 최종 제출 핸들러 등록
    setSubmitHandler(async () => {
      const finalData = getAllForm();

      try {
        const user = await fetchUserProfile();
        console.log("user", user);

        await supabase.storage
          .from("darakbar-storage")
          .upload(
            `${user?.id}/cocktail/${finalData.image.name}`,
            finalData.image,
            {
              cacheControl: "3600", // 파일 캐시 시간 (초 단위)
              upsert: true, // 파일이 이미 존재하면 덮어쓰도록 설정
            },
          );

        const publicUrl = supabase.storage
          .from("darakbar-storage")
          .getPublicUrl(`${user?.id}/cocktail/${finalData.image.name}`)
          .data.publicUrl;

        await supabase
          .from("user_cocktails")
          .insert({
            name: finalData.name,
            image_url: publicUrl,
            user_id: user?.id,
            base_liquor: finalData.baseLiquor.name,
            ingredients: finalData.ingredients.map(
              (ingredient) => ingredient.name,
            ),
            instructions: finalData.instructions,
            description: finalData.description,
            glass_type: finalData.glassType,
          } as unknown as CreateRecipeForm)
          .select();

        // 전송 성공 시 페이지 새로고침
        window.location.reload();
      } catch (error) {
        console.error("레시피 등록 실패", error);
        alert("레시피 등록에 실패했습니다. 다시 시도해주세요.");
      }
    });
  }, [setSubmitHandler, getAllForm]);
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-5">
      <FormDescription>나만의 칵테일이 완성되었어요👏</FormDescription>
      <FormDescription>
        이제 완성된 칵테일을 나만의 레시피 페이지에서 확인할 수 있어요!
      </FormDescription>
    </div>
  );
}
