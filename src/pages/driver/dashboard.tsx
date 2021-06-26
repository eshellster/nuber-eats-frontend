import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { env } from "node:process";

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}
const Driver: React.FC<IDriverProps> = () => <div className="text-3xl">🚖</div>;
export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });
  // @ts-ignore
  const onSucces = ({ coords: { latitude, longitude } }: Position) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  // @ts-ignore
  const onError = (error: PositionError) => {
    console.log(error);
  };
  const [map, setMap] = useState<google.maps.Map>();
  useEffect(() => {
    navigator.geolocation.watchPosition(onSucces, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  useEffect(() => {
    if (map) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
        },
        (result, status) => {
          console.log(status, result);
        }
      );
    }
  }, [driverCoords.lat, driverCoords.lng]);
  const onApiLoaded = ({ map }: { map: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
  };
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "95vh" }}
      >
        <GoogleMapReact
          defaultZoom={15}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          draggable={false}
          defaultCenter={{
            lat: 37.2279,
            lng: 127.44635,
          }}
          bootstrapURLKeys={{ key:  }}
        >
          <Driver lat={driverCoords.lat} lng={driverCoords.lng} />
        </GoogleMapReact>
      </div>
    </div>
  );
};
