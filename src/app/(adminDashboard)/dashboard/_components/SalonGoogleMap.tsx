"use client";

import { envConfig } from "@/config";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

// Define the type for the map instance
declare global {
  interface window {
    google: any;
  }
}

const SalonGoogleMap = ({ coordinates }: { coordinates: number[] }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);


  const center = {
    lat: Number(coordinates?.[0]),
    lng: Number(coordinates?.[1]),
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: envConfig?.mapKey as string,
    libraries: ["places"], // Make sure to always use the same library here
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "100%", borderRadius: "5px" }}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center}></Marker>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default SalonGoogleMap;
