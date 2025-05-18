import { XMarkIcon } from "@heroicons/react/24/solid";
import ReactDOM from "react-dom";
import RecipeModal from "./Recipe/RecipeModal/RecipeModal";
import useModalStore from "../stores/modalStore";
import RecipeRegisterModal from "../pages/RecipeRegister/components/RecipeRegisterModal";

const MODAL_COMPONENTS = {
  detail: RecipeModal,
  register: RecipeRegisterModal,
};

// 모달 컴포넌트
export default function ModalRoot() {
  const { modal, close } = useModalStore();
  if (!modal) return null;

  const SpecificModal = MODAL_COMPONENTS[modal];
  return ReactDOM.createPortal(
    <>
      {/* [TODO] modal-overlay 클릭 시에도 모달창 닫기 */}
      <div
        role="presentation"
        className="modal-overlay bg-opacity-50 fixed inset-0 z-20 backdrop-blur-[2px]"
        onClick={close}
      ></div>

      <div className="modal-container fixed inset-0 z-30 flex min-h-[476px] items-center justify-center">
        <section className="modal bg-opacity-70 z-40 flex h-[80%] min-w-[720px] flex-col rounded-xl bg-stone-700 p-5">
          {/* 모달 닫기 버튼 */}
          <div>
            <XMarkIcon
              className="close-btn ml-auto size-7 cursor-pointer fill-zinc-500"
              onClick={close}
            />
          </div>
          {/* 모달 내용 */}
          <SpecificModal />
        </section>
      </div>
    </>,
    document.body,
  );
}
