import React from "react";
import GoogleMapReact from "google-map-react";

export const Dashboard = () => {
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "95vh" }}
      >
        <GoogleMapReact
          defaultZoom={10}
          draggable={false}
          defaultCenter={{
            lat: 59.95,
            lng: 30.33,
          }}
          bootstrapURLKeys={{ key: "AIzaSyDl_Iujvzb_m6KvmD5CSwJ6drvgZbiP7Ng" }}
        ></GoogleMapReact>
      </div>
    </div>
  );
};
