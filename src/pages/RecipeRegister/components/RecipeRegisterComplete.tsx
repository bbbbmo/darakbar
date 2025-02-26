interface RecipeRegisterCompleteProps {
  onClose: () => void;
}

export default function RecipeRegisterComplete({
  onClose,
}: RecipeRegisterCompleteProps) {
  return (
    <div className="register-container min-w-100">
      <p>
        <span>나만의 칵테일이 완성되었어요!</span>
      </p>
      <button onClick={onClose}>확인 하기</button>
    </div>
  );
}
