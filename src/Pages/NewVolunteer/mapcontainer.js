import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import "./mapcontainer.css";

const MapContainer = (props) => {
  const { center, apiKey } = props;
  const defaultProps = {
    center: {
      lat: 26.45505,
      lng: 87.27007,
    },
    zoom: 20,
  };
  const [centerCoords, setCenterCoords] = useState(defaultProps.center);
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    setCenterCoords(center);
    setMyLocation(center);
  }, [center]);

  const handleMapClick = ({ lat, lng }) => {
    setMyLocation({ lat, lng });
    // handleMyLocationChange({ lat, lng });
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        onClick={handleMapClick}
        bootstrapURLKeys={{
          key: apiKey,
        }}
        center={centerCoords}
        defaultZoom={defaultProps.zoom}
      >
        {myLocation && JSON.stringify(center) !== "{}" ? (
          <>
            <Marker lat={myLocation.lat} lng={myLocation.lng} />
          </>
        ) : (
          ""
        )}
      </GoogleMapReact>
    </div>
  );
};
const Marker = () => {
  return (
    <div>
      <img
        src='https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-HD.png'
        height='30px'
        width='30px'
        alt=''
        class='img-fluid'
      ></img>{" "}
      pawan
    </div>
  );
};

export default MapContainer;
