import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components";
import { IconBoxProps } from "../ButtonIcon";
import { Container, Title } from "./styles";

type Props = {
  icon?: IconBoxProps;
  title: string;
};

export default function TopMessage({ icon: Icon, title }: Props) {
  const { COLORS } = useTheme();
  const { top } = useSafeAreaInsets();

  const paddingTop = top;

  return (
    <Container style={{ paddingTop }}>
      {Icon && <Icon size={18} color={COLORS.GRAY_100} />}
      <Title>{title}</Title>
    </Container>
  );
}
