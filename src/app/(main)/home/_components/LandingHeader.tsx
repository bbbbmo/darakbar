import BlurText from '@/components/Reactbits/BlurText'
import SplitText from '@/components/Reactbits/SplitText'

export default function LandingHeader() {
  return (
    <div className="flex flex-col items-center gap-4 p-5">
      <div>
        <BlurText
          text="다락바"
          className="text-5xl font-semibold text-amber-400"
        />
        <SplitText
          text="나만의 시그니처 칵테일 바 찾기"
          className="text-4xl font-semibold"
        />
      </div>
      <p className="text-center text-lg text-zinc-500">
        <span>
          칵테일 바 커뮤니티 <span className="font-bold">다락바</span>
          에서 새로운 바에 관해 이야기하며 <br></br>특별한 한 잔을 기록하고
          공유해 보세요
        </span>
      </p>
    </div>
  )
}
