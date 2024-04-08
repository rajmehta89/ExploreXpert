import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

function ResetCenterView(props) {
  const { selectPosition, routingControl, setRoutingControl } = props;
  const map = useMap();

  useEffect(() => {
    if (routingControl && map && selectPosition) {
      routingControl.setWaypoints(selectPosition.map((place) =>
        L.latLng(place.latitude, place.longitude)
      ));
    } else if (!routingControl && map && selectPosition && selectPosition.length > 1) {
      const newRoutingControl = L.Routing.control({
        waypoints: selectPosition.map((place) =>
          L.latLng(place.latitude, place.longitude)
        ),
        createMarker: (i, waypoint, n) => null,
      }).addTo(map);

      setRoutingControl(newRoutingControl);
    }
  }, [selectPosition, map, routingControl, setRoutingControl]);

  return null;
}



const handleDeleteMarker = (place) => {
  const updatedPlaces = places.filter((p) => p !== place);

  if (routingControl) {
    setRoutingControl(null);
  }

  if (updatedPlaces.length > 1) {
    const newRoutingControl = L.Routing.control({
      waypoints: updatedPlaces.map((p) => L.latLng(p.lat, p.lon)),
      createMarker: (i, waypoint, n) => {
        return null;
      },
    }).addTo(map);

    setRoutingControl(newRoutingControl);
  }
};

export default function Maps(props) {
  const { places, onDelete } = props;
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);

  const handleMapCreated = (map) => {
    setMap(map);

  };

  const handleDeleteMarker = (place) => {
    const updatedPlaces = places.filter((p) => p !== place);

    if (routingControl) {
      setRoutingControl(null);
    }

    if (updatedPlaces.length > 1) {
      const newRoutingControl = L.Routing.control({
        waypoints: updatedPlaces.map((p) => L.latLng(p.latitude, p.longitude)),
        createMarker: (i, waypoint, n) => {
          return null;
        },
      }).addTo(map);

      setRoutingControl(newRoutingControl);
    }
  };

  return (

    <MapContainer
      center={[51.505, -0.09]} // Initial center value
      zoom={6}
      maxZoom={18}
      minZoom={3}
      style={{ width: "100%", height: "100%" }}
      whenCreated={handleMapCreated}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=p2R5Zi4hLxjsNchIFOEI"
      />
      {places &&
        places.map((place, index) => (
          <Marker
            key={index}
            position={[parseFloat(place.latitude), parseFloat(place.longitude)]}
            icon={icon}
            eventHandlers={{
              click: () => handleDeleteMarker(place),
            }}
          >
            <Popup>
              <h2>{place.address}</h2>
            </Popup>
          </Marker>
        ))}
      <ResetCenterView
        selectPosition={places}
        routingControl={routingControl}
        setRoutingControl={setRoutingControl}
      />
    </MapContainer>
  );
}


