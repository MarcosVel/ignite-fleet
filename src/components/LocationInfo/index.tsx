import React from "react";
import { IconBoxProps } from "../ButtonIcon";
import IconBox from "../IconBox";
import { Container, Description, Info, Label } from "./styles";

type Props = {
  icon: IconBoxProps;
  label: string;
  address: string;
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
