const RecipeCard = () => {
  return (
    <section className="wrapper m-5 flex cursor-pointer flex-col rounded-2xl bg-stone-700 md:h-120 md:w-90">
      <img className="image-container grow-8 rounded-t-2xl bg-white" />
      <div className="recipe-title flex w-full grow-2 items-center justify-center text-center text-2xl uppercase">
        레시피 1번
      </div>
    </section>
  );
};

export default RecipeCard;
