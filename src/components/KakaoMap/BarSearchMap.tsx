'use client'

import { Map, MapMarker } from 'react-kakao-maps-sdk'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

export type Location = {
  lat: number
  lng: number
}

type KakaoMapProps = {
  location?: Location
  level?: number
  className?: string
}

// 이태원 역 좌표
const defaultLocation: Location = {
  lat: 37.53462431340019,
  lng: 126.99429764901691,
}

/**
 * @description 카카오 맵 컴포넌트
 * @param location 지도의 중심 위치
 * @param level 지도의 확대 레벨
 * @param className 클래스명
 */
export default function BarSearchMap({
  location = defaultLocation,
  level = 3,
  className,
}: KakaoMapProps) {
  const [info, setInfo] = useState<any>()
  const [markers, setMarkers] = useState<any[]>([])
  const [map, setMap] = useState<any>()

  useEffect(() => {
    if (!map) return
    const ps = new kakao.maps.services.Places()

    ps.keywordSearch('이태원 칵테일 바', (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          })
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        setMarkers(markers)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      }
    })
  }, [map])

  return (
    <Map
      center={location}
      level={level}
      className={clsx('h-96 w-full', className)}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info && info.content === marker.content && (
            <div style={{ color: '#000' }}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  )
}
