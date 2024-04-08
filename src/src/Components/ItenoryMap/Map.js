import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import placeIcon from './placeholder.png';

const icon = L.icon({
  iconUrl: placeIcon,
  iconSize: [38, 38],
});

function ResetCenterView(props) {
  const { selectPosition, routingControl, setRoutingControl, routingVisible, setRoutingVisible } = props;
  const map = useMap();

  useEffect(() => {
    if (routingControl && map && selectPosition) {
      routingControl.setWaypoints(selectPosition.map((place) =>
        L.latLng(place.lat, place.lon)
      ));
    } else if (!routingControl && map && selectPosition && selectPosition.length > 1) {
      const newRoutingControl = L.Routing.control({
        waypoints: selectPosition.map((place) =>
          L.latLng(place.lat, place.lon)
        ),
        createMarker: (i, waypoint, n) => null,
      }).addTo(map);

      setRoutingControl(newRoutingControl);
    }

    if (routingControl) {
      if (routingVisible) {
        routingControl.show();
      } else {
        routingControl.hide();
      }
    }
  }, [selectPosition, map, routingControl, setRoutingControl, routingVisible]);

  return null;
}

export default function Maps(props) {
  const { places, onDelete } = props;

  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [routingVisible, setRoutingVisible] = useState(true);
  console.log('Props passed to map',props);
  const [center, setCenter] = useState([props.lat,props.lng]);
  const [newcenter,setnewcenter]=useState([]);
  

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


  const toggleRoutingVisibility = () => {
    setRoutingVisible((prev) => !prev);
  };

  return (
    <MapContainer
    center={newcenter && newcenter.lat && newcenter.lng ? newcenter : center}
    defaultcenter={newcenter}
      zoom={6}
      maxZoom={18}  
      minZoom={3}
      style={{ width: "100%", height: "100%" }}
      whenCreated={(map) => setMap(map)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=p2R5Zi4hLxjsNchIFOEI"
      />
      {places &&
        places.map((place, index) => (
          <Marker
            key={index}
            position={[parseFloat(place.lat), parseFloat(place.lon)]}
            icon={icon}
            eventHandlers={{
              click: () => handleDeleteMarker(place),
            }}
          >
            <Popup>
              <h2>{place.display_name}</h2>
            </Popup>
            {/* <div className="map-button-container">
             <button className="map-button" onClick={toggleRoutingVisibility}>
                Toggle Routing Visibility
              </button>
          </div>  */}
          </Marker>
        ))}
      <ResetCenterView
        selectPosition={places}
        routingControl={routingControl}
        setRoutingControl={setRoutingControl}
        routingVisible={routingVisible}
        setRoutingVisible={setRoutingVisible}
      />
    </MapContainer>
  );
}