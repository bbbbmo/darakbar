import {
  ChatBubbleBottomCenterIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

// 레시피 시각 파트
export default function RecipeViewCard() {
  return (
    <div className="h-full w-full rounded-xl bg-stone-400 text-stone-100">
      <div className="h-100 w-full rounded-t-xl bg-white"></div>
      <div className="p-3">
        <div className="flex">
          <div className="w-full text-2xl">Name</div>
          <div className="float-right mr-3 flex gap-3">
            <StarIcon className="size-8 fill-zinc-600 hover:fill-zinc-700" />
            <ShareIcon className="size-8 fill-zinc-600 hover:fill-zinc-700" />
            <ChatBubbleBottomCenterIcon className="size-8 fill-zinc-600 hover:fill-zinc-700" />
          </div>
        </div>
        <article className="mt-2 text-lg">details</article>
      </div>
    </div>
  );
}
