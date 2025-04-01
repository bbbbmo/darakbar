import {
  ChatBubbleBottomCenterIcon,
  PlusIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import useRecipeStore from "../stores/modalStore";
import useButtonsStore from "../stores/buttonsStore";

export default function UserRecipeBtns() {
  const [selectStarIcon, setSelectStarIcon] = useState<boolean>(false);
  const { isDetailOpen, isChatOpen, toggleDetailOpen, toggleChatOpen } =
    useRecipeStore();
  const { starBtn, shareBtn, chatBtn, detailBtn } = useButtonsStore();

  const toggleStarIcon = () => {
    setSelectStarIcon(!selectStarIcon);
  };

  return (
    <div className="float-right flex gap-3 text-lg">
      {starBtn && (
        <span
          className="star-icon btn-primary flex cursor-pointer items-center justify-center"
          onClick={toggleStarIcon}
        >
          찜
          <StarIcon
            className={`size-7 ${selectStarIcon ? "fill-amber-300 hover:fill-amber-400" : "fill-stone-300"}`}
          />
        </span>
      )}
      {shareBtn && (
        <span className="btn-primary flex cursor-pointer items-center justify-center">
          공유
          <ShareIcon className="size-7 fill-stone-300" />
        </span>
      )}
      {chatBtn && (
        <span
          className={`${isChatOpen ? "hidden" : "btn-primary flex cursor-pointer items-center justify-center"}`}
          onClick={toggleChatOpen}
        >
          댓글
          <ChatBubbleBottomCenterIcon className="size-7 fill-stone-300" />
        </span>
      )}
      {detailBtn && (
        <span
          className={`${isDetailOpen ? "hidden" : "btn-primary flex cursor-pointer items-center justify-center"}`}
          onClick={toggleDetailOpen}
        >
          상세
          <PlusIcon className="size-7 fill-stone-300" />
        </span>
      )}
    </div>
  );
}
