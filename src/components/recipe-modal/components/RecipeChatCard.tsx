import { XMarkIcon } from "@heroicons/react/24/solid";
import useRecipeStore from "./useRecipeStrore";

// 레시피 정보
export default function RecipeChatCard() {
  const { closeChat } = useRecipeStore();
  return (
    <div className="wrapper relative h-full w-full flex-col rounded-3xl bg-slate-100">
      <div className="close-chat-card-btn absolute top-2 right-2 z-60 cursor-pointer rounded-lg bg-zinc-700">
        <XMarkIcon className="size-6" onClick={closeChat} />
      </div>
      <div className="chat-container h-auto w-full text-stone-700">
        <p>hi</p>
      </div>
    </div>
  );
}
