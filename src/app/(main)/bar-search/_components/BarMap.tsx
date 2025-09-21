"use client";

import BarSearchMap from "@/components/KakaoMap/BarSearchMap";
// import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { Spinner } from "flowbite-react";
import { Suspense } from "react";

export default function BarMap() {
  //   const { currentLocation, getCurrentLocation, isLoading, error } =
  //     useCurrentLocation();

  //   useEffect(() => {
  //     getCurrentLocation();
  //   }, []);

  //   if (isLoading) {
  //     return (
  //       <div className="flex h-96 items-center justify-center">
  //         <div className="text-white">위치 정보를 가져오는 중...</div>
  //       </div>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <div className="flex h-96 flex-col items-center justify-center space-y-4">
  //         <div className="text-center text-red-400">{error}</div>
  //         <button
  //           onClick={getCurrentLocation}
  //           className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
  //         >
  //           다시 시도
  //         </button>
  //       </div>
  //     );
  //   }

  return (
    <Suspense
      fallback={
        <div className="h-96 w-full rounded-lg bg-zinc-900">
          <Spinner color="warning" aria-label="spinner" size="xl" />
        </div>
      }
    >
      <BarSearchMap />
    </Suspense>
  );
}
