interface RecipeCardProps {
  title: string;
  image: string | null;
}

const RecipeCard = ({ title, image }: RecipeCardProps) => {
  return (
    <section className="wrapper m-5 flex cursor-pointer flex-col rounded-xl bg-stone-700 sm:h-90 sm:w-60 xl:h-120 xl:w-90">
      <img
        className="image-container h-[80%] rounded-t-xl bg-white"
        src={image ? image : undefined}
      />
      <div className="recipe-title flex w-full grow items-center justify-center text-center text-3xl font-bold uppercase">
        {title}
      </div>
    </section>
  );
};

export default RecipeCard;
