import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

interface ICoords {
  lat: number;
  lng: number;
}

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
  const [map, setMap] = useState<any>();
  const [maps, setMaps] = useState<any>();
  useEffect(() => {
    navigator.geolocation.watchPosition(onSucces, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  useEffect(() => {
    if (map && maps) {
      map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
    }
  }, [driverCoords.lat, driverCoords.lng]);
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
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
          bootstrapURLKeys={{ key: "AIzaSyDl_Iujvzb_m6KvmD5CSwJ6drvgZbiP7Ng" }}
        >
          <div className="text-3xl">🚖</div>
        </GoogleMapReact>
      </div>
    </div>
  );
};
