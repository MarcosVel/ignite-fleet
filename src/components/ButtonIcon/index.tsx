import { IconProps } from "phosphor-react-native";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components";
import { Container } from "./styles";

export type IconBoxProps = (props: IconProps) => JSX.Element;

type Props = TouchableOpacityProps & {
  icon: IconBoxProps;
};

export default function ButtonIcon({ icon: Icon, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container activeOpacity={0.5} {...rest}>
      <Icon size={24} color={COLORS.BRAND_MID} />
    </Container>
  );
}
