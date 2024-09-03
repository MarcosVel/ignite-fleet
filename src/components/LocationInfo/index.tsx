import React from "react";
import { Container, Description, Info, Label } from "./styles";

type Props = {
  label: string;
  address: string;
};

export default function LocationInfo({ label, address }: Props) {
  return (
    <Container>
      <Info>
        <Label numberOfLines={1}>{label}</Label>
        <Description numberOfLines={2}>{address}</Description>
      </Info>
    </Container>
  );
}
