import { BarInfo } from "@/app/(main)/bar-search/[barId]/mocks/bars.mocks";
import Image from "next/image";

// TODO: 이미지 여러개 추가
export default function BarImage({ bar }: { bar: BarInfo }) {
  return (
    <div className="relative h-[400px] w-full">
      {bar.image_urls?.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={bar.name}
          fill
          sizes="100vw"
          className="rounded-lg object-cover"
          priority={true}
        />
      ))}
    </div>
  );
}
