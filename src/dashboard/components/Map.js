import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";
import { MarkerLayer, Marker } from "react-leaflet-marker";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { GeoAltFill, CircleFill } from "react-bootstrap-icons";

function Inner(props) {
  const map = useMap();
  props.updater.update = () => {
    map.invalidateSize();
  };
  map.invalidateSize();
  return null;
}

export default function Map(props) {
  return (
    <MapContainer
      center={[15, 90]}
      zoom={2}
      attributionControl={false}
      className="h-100"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Inner updater={props.updater} />
      <MarkerLayer>
        <Polyline
          positions={[
            [43.073263616213886, 131.9595477547268],
            [43.049646607298186, 131.93751321572356],
            [42.98316262240285, 131.96910456319245],
            [42.951127702657836, 131.90161769699037],
            [42.963899647532, 131.90101808915907],
          ]}
          color="#aa0055"
        />
        <BoatMarker
          position={[43.4005508008934, 39.96364132625008]}
          angle={75}
          name="Тестовое судно"
          color="#f50"
        />
        <BoatMarker
          position={[43.073263616213886, 131.9595477547268]}
          angle={200}
          name="undefined"
          color="#f0a"
        />
        <BoatMarker
          position={[41.732451932187416, -49.94687817393541]}
          angle={15}
          name="Титаник"
          color="#111"
        />
        <Marker
          position={[42.963899647532, 131.90101808915907]}
          placement="top"
          size={[48, 48]}
        >
          <GeoAltFill size={48} color="#f03" />
        </Marker>
      </MarkerLayer>
    </MapContainer>
  );
}

function BoatMarker(props) {
  return (
    <Marker position={props.position} placement="center" size={[32, 1]}>
      <OverlayTrigger overlay={<Tooltip>{props.name}</Tooltip>}>
        <svg
          width="32px"
          height="32px"
          transform={`rotate(${props.angle})`}
          viewBox="0 0 12.7 12.7"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill={props.color}
        >
          <path d="M 6.3499999,-9.5367431e-8 3.3499999,3.2081344 V 12.7 h 6 V 3.2081344 Z" />
        </svg>
      </OverlayTrigger>
    </Marker>
  );
}
