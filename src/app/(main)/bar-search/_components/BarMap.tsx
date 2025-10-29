import Map from '@/components/KakaoMap/Map'
import MapMarker from '@/components/KakaoMap/MapMarker'
import MapProvider from '@/components/Providers/MapProvider'

export default function BarMap() {
  return (
    <MapProvider>
      <Map className="h-60 w-full" />
      <MapMarker
        position={{ lat: 33.450701, lng: 126.570667 }}
        imageSrc="/images/marker.png"
      />
    </MapProvider>
  )
}
