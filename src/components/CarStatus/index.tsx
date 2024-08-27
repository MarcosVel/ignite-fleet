import { Car, Key } from "phosphor-react-native";
import React from "react";
import { useTheme } from "styled-components";
import { Container, IconBox, Message, TextHighlight } from "./styles";

type Props = {
  licensePlate?: string | null;
};

export default function CarStatus({ licensePlate = null }: Props) {
  const theme = useTheme();

  const Icon = licensePlate ? Key : Car;
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : `Nenhum veículo em uso. `;
  const status = licensePlate ? "chegada" : "saída";

  return (
    <Container>
      <IconBox>{<Icon size={32} color={theme.COLORS.BRAND_LIGHT} />}</IconBox>

      <Message>
        {message}

        <TextHighlight>Clique aqui para registrar o {status}</TextHighlight>
      </Message>
    </Container>
  );
}
