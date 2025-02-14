import { useState } from "react";
// import RecipeModal from "../components/modal-recipe/RecipeModal";
import GlobalNav from "../components/layout/GlobalNav";
import Modal from "../components/layout/Modal";
import RecipeViewCard from "../components/modal-recipe/modal-recipe-components/RecipeViewCard";
import RecipeDetailCard from "../components/modal-recipe/modal-recipe-components/RecipeDetailCard";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openRecipeModal = () => {
    setIsModalOpen(true);
  };

  const closeRecipeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GlobalNav />
      <div className="flex h-full w-full bg-neutral-800 px-15 pt-15">
        <button
          className="h-10 w-30 rounded-full bg-red-500"
          onClick={openRecipeModal}
        >
          모달 OPEN
        </button>
        <Modal isOpen={isModalOpen} onClose={closeRecipeModal}>
          <div className="flex h-[80%] w-auto gap-5">
            <RecipeViewCard />
            <RecipeDetailCard />
          </div>
        </Modal>
        {/* {isModalOpen ? <RecipeModal closeModal={closeRecipeModal} /> : null} */}
      </div>
    </>
  );
}
