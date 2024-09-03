import { WifiSlash } from "phosphor-react-native";
import React from "react";
import { useTheme } from "styled-components";
import { Container, Title } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TopMessage() {
  const { COLORS } = useTheme();
  const { top } = useSafeAreaInsets();

  const paddingTop = top;

  return (
    <Container style={{ paddingTop }}>
      <WifiSlash size={18} color={COLORS.GRAY_100} />
      <Title>Você está off-line</Title>
    </Container>
  );
}
