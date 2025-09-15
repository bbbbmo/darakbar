import { BarInfo } from "@/mocks/bars.mocks";
import Image from "next/image";

// TODO: 이미지 여러개 추가
export default function BarImage({ bar }: { bar: BarInfo }) {
  return (
    <section>
      <Image
        src={bar.image_urls?.[0] ?? ""}
        alt={bar.name}
        width={400}
        height={400}
      />
    </section>
  );
}
