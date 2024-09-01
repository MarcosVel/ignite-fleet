import { useNavigation, useRoute } from "@react-navigation/native";
import { X } from "phosphor-react-native";
import React from "react";
import { Alert } from "react-native";
import { BSON } from "realm";
import { Button, ButtonIcon, Header } from "../../components";
import { useObject, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from "./styles";

type RouteParamsProps = {
  id: string;
};

export default function Arrival() {
  const realm = useRealm();
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { id } = params as RouteParamsProps;
  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string);

  function handleRemoveVehicleUsage() {
    Alert.alert("Cancelar", "Deseja cancelar a utilização do veículo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => removeVehicleUsage() },
    ]);
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    });

    goBack();
  }

  return (
    <Container>
      <Header title="Chegada" />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>

        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />

          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </Container>
  );
}
