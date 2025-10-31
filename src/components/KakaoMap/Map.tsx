'use client'

import clsx from 'clsx'
import { useEffect } from 'react'
import { useKakaoMap } from '@/app/_providers/MapProvider'

type MapProps = {
  center?: { lat: number; lng: number }
  level?: number
  className?: string
  onMapCreate?: (map: kakao.maps.Map) => void
}

export default function Map({
  center,
  level,
  className,
  onMapCreate,
}: MapProps) {
  const { setMap } = useKakaoMap()

  const defaultCenter = { lat: 33.450701, lng: 126.570667 }
  const defaultLevel = 3

  useEffect(() => {
    if (typeof window === 'undefined') return

    const initMap = () => {
      const container = document.getElementById('map')
      if (!container) return

      const mapCenter = new kakao.maps.LatLng(
        center?.lat ?? defaultCenter.lat,
        center?.lng ?? defaultCenter.lng,
      )
      const map = new kakao.maps.Map(container, {
        center: mapCenter,
        level: level ?? defaultLevel,
      })

      setMap(map)
      onMapCreate?.(map)
    }

    // SDK가 로드되었는지 확인 (autoload=false일 때는 maps.load 필요)
    if (typeof window.kakao !== 'undefined' && window.kakao.maps) {
      if (typeof window.kakao.maps.load === 'function') {
        window.kakao.maps.load(() => initMap())
      } else {
        initMap()
      }
    } else {
      // SDK 로드 대기
      const checkKakao = setInterval(() => {
        if (typeof window.kakao !== 'undefined' && window.kakao.maps) {
          clearInterval(checkKakao)
          if (typeof window.kakao.maps.load === 'function') {
            window.kakao.maps.load(() => initMap())
          } else {
            initMap()
          }
        }
      }, 100)

      return () => clearInterval(checkKakao)
    }

    return () => {
      setMap(null)
    }
  }, [])
  return <div id="map" className={clsx('h-full w-full', className)} />
}
