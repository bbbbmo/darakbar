import { useEffect } from "react";
import { showConfetti } from "../../../../../utils/showConfetti";
import FormDescription from "../../../../../components/Forms/FormDescription";
import { useRecipeCreateStore } from "../_stores/recipeCreateStore";
import supabase from "../../../../../supabase/supabase";
import { CreateRecipeForm } from "../_types/create-form.type";
import { uploadToStorage } from "@/supabase/functions/storage";
import { getCurrentUser } from "@/supabase/functions/user";

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

  useEffect(() => {
    showConfetti(5000);

    // 최종 제출 핸들러 등록
    setSubmitHandler(async () => {
      const finalData = getAllForm();
      try {
        const user = await getCurrentUser();
        // TODO: 업로드 에러 수정
        const filePath = `${user?.user?.id}/cocktail/${finalData.image.name}`;

        const { path } = await uploadToStorage(finalData.image, filePath);

        // user_cocktails 대신 unified_cocktails 사용
        await supabase
          .from("recipes")
          .insert({
            name: finalData.name,
            image_url: path,
            user_id: user?.user?.id,
            base_liquor: finalData.baseLiquor.name,
            ingredients: finalData.ingredients.map(
              (ingredient) => ingredient.name,
            ),
            instructions: finalData.instructions,
            description: finalData.description,
            glass_type: finalData.glassType,
            is_user_recipe: true, // 사용자 생성 레시피
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
