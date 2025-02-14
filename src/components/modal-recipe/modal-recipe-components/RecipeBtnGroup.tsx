import {
  ChatBubbleBottomCenterIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

export default function RecipeBtnGroup() {
  const [selectStarIcon, setSelectStarIcon] = useState<boolean>(false);

  const toggleStarIcon = () => {
    setSelectStarIcon(!selectStarIcon);
  };

  return (
    <div className="float-right flex gap-3 text-lg">
      <span
        className="star-icon flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-zinc-600 p-2"
        onClick={toggleStarIcon}
      >
        Star
        <StarIcon
          className={`size-7 ${selectStarIcon ? "fill-amber-300 hover:fill-amber-400" : "fill-stone-300 hover:fill-stone-400"}`}
        />
      </span>
      <span className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-zinc-600 p-2">
        Share
        <ShareIcon className="size-7 fill-stone-300 hover:fill-stone-400" />
      </span>
      <span className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-zinc-600 p-2">
        Chat
        <ChatBubbleBottomCenterIcon className="size-7 fill-stone-300 hover:fill-stone-400" />
      </span>
    </div>
  );
}
