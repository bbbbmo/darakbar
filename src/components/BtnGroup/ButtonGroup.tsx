import {
  ChatBubbleBottomCenterIcon,
  PlusIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

import useRecipeStore from "../../stores/modalStore";
import Button from "./Button";

type BtnGroupsProps = {
  heartBtn: boolean;
  shareBtn: boolean;
  chatBtn: boolean;
  detailBtn: boolean;
};

export default function BtnGroups({
  heartBtn,
  shareBtn,
  chatBtn,
  detailBtn,
}: BtnGroupsProps) {
  const { isDetailOpen, isChatOpen, toggleDetailOpen, toggleChatOpen } =
    useRecipeStore();

  return (
    <div className="float-right flex gap-3 text-lg">
      <Button show={heartBtn} text="좋아요">
        <StarIcon />
      </Button>
      <Button show={shareBtn} text="공유">
        <ShareIcon />
      </Button>
      <Button show={detailBtn} text="상세">
        <PlusIcon />
      </Button>
      <Button show={chatBtn} text="댓글">
        <ChatBubbleBottomCenterIcon />
      </Button>
    </div>
  );
}
