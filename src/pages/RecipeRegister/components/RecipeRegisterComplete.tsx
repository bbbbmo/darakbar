import confetti, { Options as ConfettiOptions } from "canvas-confetti";
interface RecipeRegisterCompleteProps {
  onClose: () => void;
}

interface ConfettiOptions {
  angle?: number;
  spread?: number;
  startVelocity?: number;
  elementCount?: number;
  decay?: number;
  ticks?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  shapes?: ("square" | "circle")[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
  particleCount?: number;
}

export default function RecipeRegisterComplete({
  onClose,
}: RecipeRegisterCompleteProps) {
  const handleConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration; // 지금 시간부터 5초동안 폭죽 효과

    const setting: ConfettiOptions = {
      // 폭죽 효과 CSS 설정
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#ff0000", "#0000ff"],
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min; // 최소값, 최대값 사이 무작위 숫자 생성
    }

    const interval = setInterval(() => {
      // 일정 시간마다 폭죽 터트림
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        // 시간 다 끝나면 폭죽 끔
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration); // 파티클 개수, 시간에 따라 조절됨
      confetti({
        // 위에서 설정한 세팅값을 복사하고, 파티클 수와 발사 위치 정함
        ...setting,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
      });
    }, 250); // 0.25 초마다 confetti 생성
  };
  return (
    <div className="register-container flex h-full min-w-100 flex-col items-center justify-center gap-5">
      <p className="text-lg">
        <span>나만의 칵테일이 완성되었어요!</span>
      </p>
      <button onClick={onClose} className="btn-secondary w-40">
        확인하러 가기
      </button>
      <button onClick={handleConfetti} className="btn-secondary">
        클릭
      </button>
    </div>
  );
}
