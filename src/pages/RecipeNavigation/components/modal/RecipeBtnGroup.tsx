import {
  ChatBubbleBottomCenterIcon,
  PlusIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import useRecipeStore from "../../../../stores/modalStore";

export default function RecipeBtnGroup() {
  const [selectStarIcon, setSelectStarIcon] = useState<boolean>(false);
  const { isDetailOpen, isChatOpen, toggleDetailOpen, toggleChatOpen } =
    useRecipeStore();

  const toggleStarIcon = () => {
    setSelectStarIcon(!selectStarIcon);
  };

  return (
    <div className="float-right flex gap-3 text-lg">
      <span
        className="star-icon btn-primary flex cursor-pointer items-center justify-center"
        onClick={toggleStarIcon}
      >
        Star
        <StarIcon
          className={`size-7 ${selectStarIcon ? "fill-amber-300 hover:fill-amber-400" : "fill-stone-300"}`}
        />
      </span>
      <span className="btn-primary flex cursor-pointer items-center justify-center">
        Share
        <ShareIcon className="size-7 fill-stone-300" />
      </span>
      <span
        className={`${isChatOpen ? "hidden" : "btn-primary flex cursor-pointer items-center justify-center"}`}
        onClick={toggleChatOpen}
      >
        Chat
        <ChatBubbleBottomCenterIcon className="size-7 fill-stone-300" />
      </span>
      <span
        className={`${isDetailOpen ? "hidden" : "btn-primary flex cursor-pointer items-center justify-center"}`}
        onClick={toggleDetailOpen}
      >
        Details
        <PlusIcon className="size-7 fill-stone-300" />
      </span>
    </div>
  );
}
