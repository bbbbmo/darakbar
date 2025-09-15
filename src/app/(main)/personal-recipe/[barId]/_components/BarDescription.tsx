import SubTitleText from "@/components/SubTitleText";
import Tags from "@/components/Tags";
import TitleText from "@/components/TitleText";
import { BarInfo } from "@/mocks/bars.mocks";
import { HiStar } from "react-icons/hi";

export default function BarDescription({ bar }: { bar: BarInfo }) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center">
        <TitleText title={bar.name} />
        <span className="text-md ml-auto flex items-center text-xl">
          <HiStar size={24} className="fill-amber-400" />
          {bar.rating}
        </span>
      </div>
      <span className="text-sm">{bar.address}</span>
      <p>{bar.description}</p>
      <SubTitleText title="분위기" />
      <Tags tags={bar.tags} />
    </section>
  );
}
