import { BarInfo } from "@/mocks/bars.mocks";
import Image from "next/image";

// TODO: 이미지 여러개 추가
export default function BarImage({ bar }: { bar: BarInfo }) {
  return (
    <div className="relative h-[400px] w-full">
      <Image
        src={bar.image_urls?.[0] ?? ""}
        alt={bar.name}
        fill
        sizes="100vw"
        className="rounded-lg object-cover"
      />
    </div>
  );
}
