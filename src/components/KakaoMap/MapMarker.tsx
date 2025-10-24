type MapMarkerProps = {
  imageSrc: string
  size: {
    width: number
    height: number
  }
  options: {
    offset: {
      x: number
      y: number
    }
  }
  position: {
    lat: number
    lng: number
  }
  onClick: () => void
  children: React.ReactNode
}

export default function MapMarker({ position }: MapMarkerProps) {
  const markerPosition = new kakao.maps.LatLng(position.lat, position.lng)
  return <div>MapMarker</div>
}
