import clsx from 'clsx'
import { produce } from 'immer'
import { useEffect, useMemo } from 'react'

type MapProps = {
  center?: {
    lat: number
    lng: number
  }
  level?: number
  className?: string
}

export default function Map({ center, level, className }: MapProps) {
  const defaultOptions = {
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    level: 3,
  }

  const finalOptions = useMemo(
    () =>
      produce(defaultOptions, (draft) => {
        if (center) {
          draft.center = center
        }
        if (level) {
          draft.level = level
        }
      }),
    [center, level],
  )

  useEffect(() => {
    const container = document.getElementById('map')
    new kakao.maps.Map(container, finalOptions)
  }, [finalOptions])

  return <div id="map" className={clsx('h-full w-full', className)} />
}
