'use client'

import { useEffect, useRef } from 'react'
import { useKakaoMap } from '@/components/Providers/MapProvider'

type MapMarkerProps = {
  imageSrc?: string
  size?: { width: number; height: number }
  options?: { offset?: { x: number; y: number } }
  position: { lat: number; lng: number }
  onClick?: () => void
  children?: React.ReactNode // 필요시 커스텀 오버레이로 확장 가능
}

export default function MapMarker({
  imageSrc,
  size,
  options,
  position,
  onClick,
}: MapMarkerProps) {
  const { map } = useKakaoMap()
  const markerRef = useRef<kakao.maps.Marker | null>(null)
  const clickHandlerRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!map) return

    // LatLng
    const markerPosition = new kakao.maps.LatLng(position.lat, position.lng)

    // MarkerImage (옵션이 있을 때만)
    let markerImage: kakao.maps.MarkerImage | undefined
    if (imageSrc && size) {
      const imgSize = new kakao.maps.Size(size.width, size.height)
      const imgOpts = options?.offset
        ? { offset: new kakao.maps.Point(options.offset.x, options.offset.y) }
        : undefined
      markerImage = new kakao.maps.MarkerImage(imageSrc, imgSize, imgOpts)
    }

    // 마커 생성 또는 재사용
    if (!markerRef.current) {
      markerRef.current = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
        clickable: true,
      })
      markerRef.current.setMap(map)
    } else {
      markerRef.current.setPosition(markerPosition)
      if (markerImage) {
        // 이미지가 바뀌는 경우 새 마커로 교체하는 편이 안전
        markerRef.current.setMap(null)
        markerRef.current = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
          clickable: true,
        })
        markerRef.current.setMap(map)
      }
    }

    // 클릭 이벤트
    if (onClick && markerRef.current) {
      clickHandlerRef.current = onClick
      kakao.maps.event.addListener(
        markerRef.current,
        'click',
        clickHandlerRef.current,
      )
    }

    return () => {
      if (markerRef.current) {
        if (clickHandlerRef.current) {
          kakao.maps.event.removeListener(
            markerRef.current,
            'click',
            clickHandlerRef.current,
          )
          clickHandlerRef.current = null
        }
        markerRef.current.setMap(null)
        markerRef.current = null
      }
    }
  }, [
    map,
    position.lat,
    position.lng,
    imageSrc,
    size?.width,
    size?.height,
    options?.offset?.x,
    options?.offset?.y,
    onClick,
  ])

  return null
}
