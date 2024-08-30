import React, { useRef, useState } from "react";
import {
  Alert,
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
import { licensePlateValidate } from "../../utils/licensePlateValidate";

const keyboardAvoidingBehavior =
  Platform.OS === "android" ? "height" : "position";

export default function Departure() {
  const licensePlateRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const [data, setData] = useState({
    licensePlate: "",
    description: "",
  });

  function handleDeparture() {
    if (licensePlateValidate(data.licensePlate)) {
      return;
    }

    licensePlateRef.current?.focus();
    Alert.alert("Placa inválida", "Por favor, informe a placa correta.");
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
                ref={licensePlateRef}
                label="Placa do veículo"
                placeholder="QLX2360"
                onSubmitEditing={() => descriptionRef.current?.focus()} // move to next input
                returnKeyType="next"
                onChangeText={(text) =>
                  setData((prevData) => ({
                    ...prevData,
                    licensePlate: text,
                  }))
                }
              />

              <TextAreaInput
                ref={descriptionRef}
                label="Finalidade"
                placeholder="Vou utilizar o veículo para..."
                onChangeText={(text) =>
                  setData((prevData) => ({
                    ...prevData,
                    description: text,
                  }))
                }
              />

              <Button title="Registrar saída" onPress={handleDeparture} />
            </Content>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
