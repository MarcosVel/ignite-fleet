import { Car, Key } from "phosphor-react-native";
import React from "react";
import { useTheme } from "styled-components";
import { Container, IconBox, Message, TextHighlight } from "./styles";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  licensePlate?: string | null;
};

export default function CarStatus({ licensePlate = null, ...rest }: Props) {
  const theme = useTheme();

  const Icon = licensePlate ? Key : Car;
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : `Nenhum veículo em uso. `;
  const status = licensePlate ? "chegada" : "saída";

  return (
    <Container {...rest}>
      <IconBox>{<Icon size={32} color={theme.COLORS.BRAND_LIGHT} />}</IconBox>

      <Message>
        {message}

        <TextHighlight>Clique aqui para registrar a {status}</TextHighlight>
      </Message>
    </Container>
  );
}
