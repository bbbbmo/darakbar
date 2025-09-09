"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  // SDK 로드 완료 시 호출
  useEffect(() => {
    const tryInit = () => {
      if (!window.kakao || !divRef.current) return;
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(33.450701, 126.570667);
        const map = new window.kakao.maps.Map(divRef.current, {
          center,
          level: 3,
        });

        // 예시: 마커 하나
        new window.kakao.maps.Marker({ position: center, map });

        mapRef.current = map;
        setTimeout(() => {
          map.relayout();
          map.setCenter(center);
        }, 0);
      });
    };
    if (window.kakao && window.kakao.maps) tryInit();

    const id = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        tryInit();
        clearInterval(id);
      }
    }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* 컨테이너는 고정 높이가 있어야 지도 표시됨 */}
      <div ref={divRef} style={{ width: "500px", height: "400px" }} />
    </>
  );
}
