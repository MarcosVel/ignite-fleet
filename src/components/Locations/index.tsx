import { Car, FlagCheckered } from "phosphor-react-native";
import React from "react";
import LocationInfo from "../LocationInfo";
import { Container, Line } from "./styles";

type Props = {
  departure: {
    label: string;
    address: string;
  };
  arrival: {
    label: string;
    address: string;
  };
};

export default function Locations({ departure, arrival }: Props) {
  return (
    <Container>
      <LocationInfo
        icon={Car}
        label={departure.label}
        address={departure.address}
      />

      <Line />

      <LocationInfo
        icon={FlagCheckered}
        label={arrival.label}
        address={arrival.address}
      />
    </Container>
  );
}
