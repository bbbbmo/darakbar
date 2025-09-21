"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export type Location = {
  lat: number;
  lng: number;
};

type KakaoMapProps = {
  location?: Location;
  level?: number;
  className?: string;
};

const defaultLocation: Location = {
  lat: 37.53462431340019,
  lng: 126.99429764901691,
};

/**
 * @description 카카오 맵 컴포넌트
 * @param location 지도의 중심 위치
 * @param level 지도의 확대 레벨
 * @param className 클래스명
 */
export default function KakaoMap({
  location = defaultLocation,
  level = 3,
  className,
}: KakaoMapProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  // SDK 로드 완료 시 호출
  useEffect(() => {
    const tryInit = () => {
      if (!window.kakao || !divRef.current) return;

      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(
          location?.lat,
          location?.lng,
        );
        const map = new window.kakao.maps.Map(divRef.current, {
          center,
          level: level,
        });

        const markerImage = new window.kakao.maps.MarkerImage(
          "/images/marker/bar-marker.png",
          new window.kakao.maps.Size(32, 37), // 마커 이미지의 크기
          {
            offset: new window.kakao.maps.Point(16, 37), // 마커의 좌표와 일치시킬 이미지 안에서의 좌표
          },
        );

        // 예시: 마커 하나
        new window.kakao.maps.Marker({
          position: center,
          map,
          image: markerImage,
        });

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
      <div ref={divRef} className={clsx("h-96 w-full rounded-lg", className)} />
    </>
  );
}
