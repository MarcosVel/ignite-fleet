import React from "react";
import MapView, {
  LatLng,
  MapViewProps,
  PROVIDER_GOOGLE,
} from "react-native-maps";

type Props = MapViewProps & {
  coordinates: LatLng[];
};

export default function Map({ coordinates, ...rest }: Props) {
  const lastCoordinates = coordinates[coordinates.length - 1];

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ width: "100%", height: 200 }}
      region={{
        latitude: lastCoordinates.latitude,
        longitude: lastCoordinates.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    />
  );
}
