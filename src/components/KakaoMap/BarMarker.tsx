import { MapMarker } from "react-kakao-maps-sdk";
import { Location } from "./BarSearchMap";

export default function BarMarker({ location }: { location: Location }) {
  return (
    <MapMarker
      image={{
        src: "/images/marker/bar-marker.png",
        size: {
          width: 32,
          height: 37,
        },
        options: {
          offset: {
            x: 16,
            y: 37,
          },
        },
      }}
      position={{ lat: location.lat, lng: location.lng }}
    ></MapMarker>
  );
}
