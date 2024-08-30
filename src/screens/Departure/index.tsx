import React, { useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Button,
  Header,
  LicensePlateInput,
  TextAreaInput,
} from "../../components";
import { Container, Content } from "./styles";

const keyboardAvoidingBehavior =
  Platform.OS === "android" ? "height" : "position";

export default function Departure() {
  const descriptionRef = useRef<TextInput>(null);

  function handleDeparture() {
    console.log("ok");
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Header title="Saída" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={keyboardAvoidingBehavior}
          enabled
        >
          <ScrollView>
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

              <Button title="Registrar saída" onPress={handleDeparture} />
            </Content>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
