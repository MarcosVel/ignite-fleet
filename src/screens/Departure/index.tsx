import React, { useRef } from "react";
import { Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";
import {
  Button,
  Header,
  LicensePlateInput,
  TextAreaInput,
} from "../../components";
import { Container, Content } from "./styles";

export default function Departure() {
  const descriptionRef = useRef<TextInput>(null);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Header title="Saída" />

        <Content>
          <LicensePlateInput
            label="Placa do veículo"
            placeholder="QLX2360"
            onSubmitEditing={() => descriptionRef.current?.focus()} // move to next input
            returnKeyType="next"
          />

          <TextAreaInput
            ref={descriptionRef}
            label="Finalidade"
            placeholder="Vou utilizar o veículo para..."
          />

          <Button title="Registrar saída" />
        </Content>
      </Container>
    </TouchableWithoutFeedback>
  );
}
