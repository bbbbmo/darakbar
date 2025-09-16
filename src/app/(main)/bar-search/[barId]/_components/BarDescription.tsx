import SubTitleText from "@/components/SubTitleText";
import Tags from "@/components/Tags";
import TitleText from "@/components/TitleText";
import { BarInfo } from "@/mocks/bars.mocks";
import { HiOutlineLocationMarker, HiStar } from "react-icons/hi";

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
          <span className="flex items-center gap-2 text-xl">
            <HiOutlineLocationMarker size={20} />
            강남구, 서울
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
