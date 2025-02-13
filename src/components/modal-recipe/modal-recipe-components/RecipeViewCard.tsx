import {
  ChatBubbleBottomCenterIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

export default function RecipeViewCard() {
  return (
    <div className="h-full w-full rounded-xl bg-stone-400 text-stone-100">
      <div className="h-100 w-full rounded-t-xl bg-white"></div>
      <div className="p-3">
        <div className="flex">
          <div className="w-full text-2xl">Name</div>
          <div className="float-right mr-3 flex gap-3">
            <StarIcon className="size-9 fill-zinc-600" />
            <ShareIcon className="size-9 fill-zinc-600" />
            <ChatBubbleBottomCenterIcon className="size-9 fill-zinc-600" />
          </div>
        </div>
        <article className="mt-2 text-lg">details</article>
      </div>
    </div>
  );
}
