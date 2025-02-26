export default function RecipeRegisterIntroduce() {
  return (
    <section className="register-container">
      <p>
        <span>만들어진 나만의 칵테일 제조법을 설명해 주세요!</span>
      </p>
      <div>
        <label htmlFor="">베이스(주재료)</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">재료 1</label>
        <input type="text" />
      </div>
      <button>+</button>
    </section>
  );
}
