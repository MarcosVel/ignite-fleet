import { Car, FlagCheckered } from "phosphor-react-native";
import React, { useRef } from "react";
import MapView, {
  LatLng,
  MapViewProps,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import IconBox from "../IconBox";
import { useTheme } from "styled-components";

type Props = MapViewProps & {
  coordinates: LatLng[];
};

export default function Map({ coordinates, ...rest }: Props) {
  const { COLORS } = useTheme();
  const mapRef = useRef<MapView>(null);
  const lastCoordinates = coordinates[coordinates.length - 1];

  async function onMapLoaded() {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(["departure", "arrival"], {
        edgePadding: { top: 80, right: 50, bottom: 20, left: 50 },
      });
    }
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ width: "100%", height: 200 }}
      region={{
        latitude: lastCoordinates.latitude,
        longitude: lastCoordinates.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={onMapLoaded}
      {...rest}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox icon={Car} size="SMALL" />
      </Marker>

      {coordinates.length > 1 && (
        <>
          <Marker identifier="arrival" coordinate={lastCoordinates}>
            <IconBox icon={FlagCheckered} size="SMALL" />
          </Marker>

          <Polyline
            coordinates={[...coordinates]}
            strokeColor={COLORS.GRAY_700}
            strokeWidth={6}
          />
        </>
      )}
    </MapView>
  );
}
