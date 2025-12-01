import BlurText from '@/components/Reactbits/BlurText'
import SplitText from '@/components/Reactbits/SplitText'
import Image from 'next/image'

export default function LandingHeader() {
  return (
    <section className="flex flex-col items-center gap-4 pt-10">
      <div className="absolute inset-0 z-0 h-[50vh] w-full">
        <Image
          src="/images/background/julian-di-pietrantonio-Kz06PX2yu7U-unsplash.jpg"
          alt="Landing Header Image"
          fill
          className="object-cover brightness-[0.75]"
        />
      </div>
      <h1 className="relative z-10">
        <BlurText
          text="다락바"
          className="text-5xl font-semibold text-amber-400"
        />
        <SplitText
          text="나만의 시그니처 칵테일 바 찾기"
          className="text-4xl font-semibold"
        />
      </h1>
      <p className="relative z-10 text-center text-lg text-zinc-500">
        <span>
          칵테일 바 커뮤니티 <span className="font-bold">다락바</span>
          에서 새로운 바에 관해 이야기하며 <br></br>특별한 한 잔을 기록하고
          공유해 보세요
        </span>
      </p>
    </section>
  )
}
