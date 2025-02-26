interface RecipeRegisterCompleteProps {
  onClose: () => void;
}

export default function RecipeRegisterComplete({
  onClose,
}: RecipeRegisterCompleteProps) {
  return (
    <div className="register-container flex h-full min-w-100 flex-col items-center justify-center gap-5">
      <p className="text-lg">
        <span>나만의 칵테일이 완성되었어요!</span>
      </p>
      <button onClick={onClose} className="btn-secondary w-40">
        확인하러 가기
      </button>
    </div>
  );
}
