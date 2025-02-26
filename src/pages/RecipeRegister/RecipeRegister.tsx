import { useEffect, useState } from "react";
import GlobalFooter from "../../components/layout/GlobalFooter";
import GlobalNav from "../../components/layout/GlobalNav";
import Modal from "../../components/modal/Modal";
import SearchBar from "../../components/SearchBar";
import useModalStore from "../../stores/modalStore";
import RecipeRegisterIngredients from "./components/RecipeRegisterIngredients";
import RecipeRegisterBasicInfo from "./components/RecipeRegisterBasicInfo";
import RecipeRegisterIntroduce from "./components/RecipeRegisterIntroduce";
import RecipeRegisterComplete from "./components/RecipeRegisterComplete";

export default function RecipeRegister() {
  const { isDetailOpen, isChatOpen } = useModalStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 레시피 등록 모달 열기
  const openRegisterModal = () => {
    setCurrentStep(1);
    setIsModalOpen(true);
  };

  // 레시피 등록 모달 닫기
  const closeRegisterModal = () => {
    setIsModalOpen(false);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    console.log(currentStep);
  }, [currentStep]);
  return (
    <>
      <GlobalNav />
      <div className="wrapper h-full w-full px-15 pt-15">
        <div className="mt-10 mb-10 flex h-full w-full flex-col">
          <p className="flex flex-col text-xl text-amber-400">
            <span>자신만의 칵테일을 만들어 다락바에 보관해 보세요!</span>
            <button
              className="btn-secondary sm:w-30 xl:w-50"
              onClick={openRegisterModal}
            >
              레시피 등록하기
            </button>
          </p>
        </div>
        <div className="grid justify-center md:grid-cols-3 xl:grid-cols-4"></div>
        {/* 모달 */}
        <Modal isOpen={isModalOpen} onClose={closeRegisterModal}>
          {(() => {
            switch (currentStep) {
              case 1:
                return <RecipeRegisterIngredients nextStep={nextStep} />;
              case 2:
                return (
                  <RecipeRegisterBasicInfo
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                );
              case 3:
                return (
                  <RecipeRegisterIntroduce
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                );
              default:
                return <RecipeRegisterComplete onClose={closeRegisterModal} />;
            }
          })()}
        </Modal>
        <SearchBar />
      </div>
      <GlobalFooter />
    </>
  );
}
