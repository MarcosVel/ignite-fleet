import { useNavigation } from "@react-navigation/native";
import { useUser } from "@realm/react";
import React, { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Button,
  Header,
  LicensePlateInput,
  TextAreaInput,
} from "../../components";
import { useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { licensePlateValidate } from "../../utils/licensePlateValidate";
import { Container, Content } from "./styles";

export default function Departure() {
  const realm = useRealm();
  const { id } = useUser();

  const { goBack } = useNavigation();

  const licensePlateRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const [data, setData] = useState({
    licensePlate: "",
    description: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);

  function handleDeparture() {
    try {
      if (!licensePlateValidate(data.licensePlate)) {
        licensePlateRef.current?.focus();
        return Alert.alert(
          "Placa inválida",
          "Por favor, informe a placa correta."
        );
      }

      if (data.description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert(
          "Finalidade",
          "Por favor, informe a finalidade da utilização do veículo."
        );
      }

      setIsRegistering(true);

      realm.write(() => {
        realm.create(
          "Historic",
          Historic.generate({
            user_id: id,
            license_plate: data.licensePlate.toUpperCase(),
            description: data.description,
          })
        );
      });

      Alert.alert("Saída registrada!", "Veículo registrado com sucesso.");
      goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Ops!", "Ocorreu um erro ao registrar a saída.");
      setIsRegistering(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Header title="Saída" />

        <KeyboardAwareScrollView extraHeight={100}>
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

              <Button
                title="Registrar saída"
                onPress={handleDeparture}
                isLoading={isRegistering}
              />
            </Content>
          </ScrollView>
        </KeyboardAwareScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
