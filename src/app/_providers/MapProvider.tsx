'use client'

import { createContext, useContext, useState } from 'react'

type MapContextType = {
  map: kakao.maps.Map | null
  setMap: (map: kakao.maps.Map | null) => void
}

const MapContext = createContext<MapContextType | null>(null)

export default function MapProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  )
}

export function useKakaoMap() {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useKakaoMap must be used within a MapProvider')
  }
  return context
}
