import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Loading, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

export default function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <Container activeOpacity={0.7} disabled={isLoading} {...rest}>
      {isLoading ? <Loading /> : <Title>{title}</Title>}
    </Container>
  );
}
