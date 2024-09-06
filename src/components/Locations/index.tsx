import { Car, FlagCheckered } from "phosphor-react-native";
import React from "react";
import LocationInfo, { LocationInfoProps } from "../LocationInfo";
import { Container, Line } from "./styles";

type Props = {
  departure: LocationInfoProps;
  arrival?: LocationInfoProps | null;
};

export default function Locations({ departure, arrival = null }: Props) {
  return (
    <Container>
      <LocationInfo
        icon={Car}
        label={departure.label}
        address={departure.address}
      />

      {arrival && (
        <>
          <Line />

          <LocationInfo
            icon={FlagCheckered}
            label={arrival.label}
            address={arrival.address}
          />
        </>
      )}
    </Container>
  );
}
