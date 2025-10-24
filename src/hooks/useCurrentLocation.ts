import { Location } from '@/app/(main)/_components/BarMap/BarSearchMap'
import { useState } from 'react'

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<Location>({
    lat: 0,
    lng: 0,
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('이 브라우저는 위치 서비스를 지원하지 않습니다.')
      return
    }

    // HTTPS 체크
    if (
      window.location.protocol !== 'https:' &&
      window.location.hostname !== 'localhost'
    ) {
      setError('위치 서비스는 HTTPS 환경에서만 사용할 수 있습니다.')
      return
    }
    setIsLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setIsLoading(false)
      },
      (error) => {
        let errorMessage = '위치를 가져올 수 없습니다.'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '위치 접근 권한이 거부되었습니다.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = '위치 정보를 사용할 수 없습니다.'
            break
          case error.TIMEOUT:
            errorMessage = '위치 요청이 시간 초과되었습니다.'
            break
        }
        setError(errorMessage)
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5분
      },
    )
  }

  return { currentLocation, error, isLoading, getCurrentLocation }
}
