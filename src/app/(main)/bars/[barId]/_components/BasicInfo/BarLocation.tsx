'use client'

import SubTitleText from '@/components/ui/text/SubTitleText'
import { Card } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

type BarLocationProps = {
  address: string
}

export default function BarLocation({ address }: BarLocationProps) {
  const [coords, setCoords] = useState<kakao.maps.LatLng | null>(null)

  useEffect(() => {
    if (!address) {
      return
    }
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder()

      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const newCoords = new kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x),
          )
          setCoords(newCoords)
          console.log(newCoords)
        }
      })
    })
  }, [address])

  return (
    <Card>
      <SubTitleText
        icon={<HiLocationMarker size={24} className="text-amber-400" />}
        title="위치"
      />
      <div className="mt-4">
        {coords ? (
          <Map
            center={{ lat: coords.getLat(), lng: coords.getLng() }}
            style={{ width: '100%', height: '360px' }}
          >
            <MapMarker
              position={{ lat: coords.getLat(), lng: coords.getLng() }}
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
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-500">
            위치 정보를 가져올 수 없습니다.
          </div>
        )}
      </div>
    </Card>
  )
}
