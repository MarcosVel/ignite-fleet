import { Car, FlagCheckered } from "phosphor-react-native";
import React from "react";
import MapView, {
  LatLng,
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import IconBox from "../IconBox";

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
    >
      <Marker coordinate={coordinates[0]}>
        <IconBox icon={Car} size="SMALL" />
      </Marker>

      {coordinates.length > 1 && (
        <Marker coordinate={lastCoordinates}>
          <IconBox icon={FlagCheckered} size="SMALL" />
        </Marker>
      )}
    </MapView>
  );
}
