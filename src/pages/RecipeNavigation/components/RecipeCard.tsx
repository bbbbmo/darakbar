interface RecipeCardProps {
  title: string;
  image: string;
}

const RecipeCard = ({ title, image }: RecipeCardProps) => {
  return (
    <section className="wrapper m-5 flex cursor-pointer flex-col rounded-2xl bg-stone-700 sm:h-90 sm:w-60 xl:h-120 xl:w-90">
      <img
        className="image-container h-[80%] rounded-t-2xl bg-white"
        src={image ? image : undefined}
      />
      <div className="recipe-title flex w-full grow items-center justify-center text-center text-2xl uppercase">
        {title}
      </div>
    </section>
  );
};

export default RecipeCard;
