import SubTitleText from "@/components/SubTitleText";
import Tags from "@/components/Tags";
import TitleText from "@/components/TitleText";
import { BarInfo } from "@/mocks/bars.mocks";
import { HiLocationMarker, HiStar } from "react-icons/hi";

export default function BarDescription({ bar }: { bar: BarInfo }) {
  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex items-center">
          <TitleText title={bar.name} />
          <span className="text-md ml-auto flex items-center text-2xl">
            <HiStar size={28} className="fill-amber-400" />
            {bar.rating}
          </span>
        </div>
        <p className="flex flex-col gap-2 text-zinc-500">
          <span className="group flex cursor-pointer items-center gap-2 text-xl">
            <HiLocationMarker
              size={20}
              className="text-red-500 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:text-red-600"
            />
            <span className="decoration-zinc-600 decoration-2 underline-offset-4 group-hover:underline">
              강남구, 서울
            </span>
          </span>
          <span>{bar.address}</span>
        </p>
        <p className="text-xl">{bar.description}</p>
      </section>
      <section className="flex flex-col gap-3">
        <SubTitleText title="분위기" />
        <Tags tags={bar.tags} />
      </section>
    </>
  );
}
