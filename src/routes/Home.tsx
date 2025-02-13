import { useState } from "react";
import RecipeModal from "../components/modal-recipe/RecipeModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openRecipeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex h-full w-full bg-neutral-800 px-15 pt-15">
      <button
        className="h-10 w-30 rounded-full bg-red-500"
        onClick={openRecipeModal}
      >
        모달 OPEN
      </button>

      {isModalOpen ? <RecipeModal /> : null}
    </div>
  );
}
