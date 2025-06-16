import { showConfetti } from "../../../../utils/showConfetti";
import FormDescription from "../../../Form/FormDescription";

/**
 * @description 칵테일 등록 완료 화면
 */
export default function SuccessCreate() {
  showConfetti(5000);
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-5">
      <FormDescription>나만의 칵테일이 완성되었어요👏</FormDescription>
      <FormDescription>
        이제 완성된 칵테일을 나만의 레시피 페이지에서 확인할 수 있어요!
      </FormDescription>
    </div>
  );
}
