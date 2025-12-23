import { Bar } from '@/api/bar/getBars'
import { regionOptions } from '@/const/bar-options.const'
import { Card } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

type BarMapProps = {
  bars: Bar[]
  locationName: string
}

export default function BarMap({ bars, locationName }: BarMapProps) {
  const [coords, setCoords] = useState<kakao.maps.LatLng | null>()

  useEffect(() => {
    kakao.maps.load(() => {
      if (locationName === regionOptions[0]) {
        // 현재 위치로 설정
        return
      }
      const geocoder = new kakao.maps.services.Geocoder()
      geocoder.addressSearch(locationName, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const newCoords = new kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x),
          )

          setCoords(newCoords)
        }
      })
    })
  }, [bars, locationName])

  return (
    <Card>
      <h2 className="flex items-center gap-2">
        <HiLocationMarker className="h-6 w-6 text-amber-500" />
        지도
      </h2>
      {/* 추후 현재 위치로 바꿔야함 */}
      <Map
        center={{
          lat: coords?.getLat() || 33.450701,
          lng: coords?.getLng() || 126.570667,
        }}
        style={{ width: '100%', height: '360px' }}
      >
        <MapMarker
          position={{
            lat: coords?.getLat() || 33.450701,
            lng: coords?.getLng() || 126.570667,
          }}
          image={{
            src: '/images/marker/bar-marker.png',
            size: {
              width: 32,
              height: 35,
            },
            options: {
              offset: {
                x: 16,
                y: 35,
              },
            },
          }}
        ></MapMarker>
      </Map>
    </Card>
  )
}
