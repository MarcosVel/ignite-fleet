import React from "react";
import { Header, LicensePlateInput, TextAreaInput } from "../../components";
import { Container, Content } from "./styles";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function Departure() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Header title="Saída" />

        <Content>
          <LicensePlateInput label="Placa do veículo" placeholder="QLX2360" />

          <TextAreaInput label="Finalidade" placeholder="Vou utilizar o veículo para..." />
        </Content>
      </Container>
    </TouchableWithoutFeedback>
  );
}
