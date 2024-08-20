import { Power } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import theme from "../../theme";
import { Container, Greeting, Message, Name, SafeArea } from "./styles";

export default function HomeHeader() {
  return (
    <SafeArea>
      <Container>
        <Greeting>
          <Message>Olá,</Message>
          <Name>Marcos,</Name>
        </Greeting>

        <TouchableOpacity>
          <Power size={32} color={theme.COLORS.GRAY_400} />
        </TouchableOpacity>
      </Container>
    </SafeArea>
  );
}
