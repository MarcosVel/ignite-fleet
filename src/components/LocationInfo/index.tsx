import React from "react";
import { IconBoxProps } from "../ButtonIcon";
import IconBox from "../IconBox";
import { Container, Description, Info, Label } from "./styles";

export type LocationInfoProps = {
  label: string;
  address: string;
};

type Props = LocationInfoProps & {
  icon: IconBoxProps;
};

export default function LocationInfo({ icon, label, address }: Props) {
  return (
    <Container>
      <IconBox icon={icon} />

      <Info>
        <Label numberOfLines={1}>{label}</Label>
        <Description numberOfLines={2}>{address}</Description>
      </Info>
    </Container>
  );
}
