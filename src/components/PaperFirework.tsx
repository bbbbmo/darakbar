import React, { useRef } from "react";
import Confetti from "react-canvas-confetti";

export default function PaperFireworks() {
  const confettiRef = useRef(null); // Confetti 캔버스를 참조합니다.

  // 폭죽을 시작하는 함수
  const startConfetti = () => {
    if (confettiRef.current) {
      confettiRef.current.start(); // Confetti 시작
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="mb-5 text-3xl text-white">종이 폭죽 효과</h1>
        <button
          onClick={startConfetti}
          className="rounded-lg bg-amber-400 px-6 py-3 text-white hover:bg-amber-500"
        >
          폭죽 시작
        </button>
      </div>

      {/* Confetti 컴포넌트를 사용해 폭죽을 표시 */}
      <Confetti
        ref={confettiRef}
        numberOfPieces={150}
        recycle={false} // 한 번 터지면 더 이상 재활용하지 않음
        colors={["#ff6347", "#ff4500", "#ff8c00", "#ffd700"]} // 폭죽의 색상들
        origin={{ x: 0.5, y: 0.5 }} // 폭죽의 출발 위치
      />
    </div>
  );
}
