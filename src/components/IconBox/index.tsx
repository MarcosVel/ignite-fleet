import React from "react";
import { useTheme } from "styled-components";
import { IconBoxProps } from "../ButtonIcon";
import { Container, SizeProps } from "./styles";

type Props = {
  icon: IconBoxProps;
  size?: SizeProps;
};

export default function IconBox({ icon: Icon, size = "NORMAL" }: Props) {
  const { COLORS } = useTheme();
  const iconSize = size === "NORMAL" ? 32 : 16;

  return (
    <Container size={size}>
      <Icon size={iconSize} color={COLORS.BRAND_LIGHT} />
    </Container>
  );
}
