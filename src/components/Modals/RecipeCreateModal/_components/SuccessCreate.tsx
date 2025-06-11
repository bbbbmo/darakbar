import FormDescription from "../../../Form/FormDescription";

// TODO: 스타일 수정
export default function SuccessCreate() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-5">
      <FormDescription>나만의 칵테일이 완성되었어요👏</FormDescription>
      <FormDescription>
        완성된 칵테일을 나만의 레시피 페이지에서 확인할 수 있어요
      </FormDescription>
    </div>
  );
}
