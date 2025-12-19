import Map from '@/components/kakao-map/Map'
import MapMarker from '@/components/kakao-map/MapMarker'
import MapProvider from '@/app/_providers/MapProvider'

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
