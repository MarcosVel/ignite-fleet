import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  const { COLORS } = useTheme();
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();

  const paddingTop = top + 40;

  return (
    <Container style={{ paddingTop }}>
      <TouchableOpacity hitSlop={20} onPress={goBack}>
        <ArrowLeft size={24} weight="bold" color={COLORS.BRAND_LIGHT} />
      </TouchableOpacity>

      <Title>{title}</Title>
    </Container>
  );
}
