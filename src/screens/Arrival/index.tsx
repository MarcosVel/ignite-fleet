import { useNavigation, useRoute } from "@react-navigation/native";
import { X } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ToastAndroid } from "react-native";
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
  SyncMessage,
} from "./styles";
import { getLastSyncTimestamp } from "../../libs/asyncStorage/syncStorage";

type RouteParamsProps = {
  id: string;
};

export default function Arrival() {
  const realm = useRealm();
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { id } = params as RouteParamsProps;

  const [dataNotSynced, setDataNotSynced] = useState(false);

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string);

  const title = historic?.status === "arrival" ? "Chegada" : "Detalhes";

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

    ToastAndroid.show("Utilização cancelada!", ToastAndroid.SHORT);

    goBack();
  }

  function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert(
          "Error",
          "Não foi possível obter os dados para registrar a chegada do veículo."
        );
      }

      realm.write(() => {
        historic.status = "arrival";
        historic.update_at = new Date();
      });

      Alert.alert(
        "Chegada registrada!",
        "Chegada do veículo registrado com sucesso."
      );

      goBack();
    } catch (error) {
      Alert.alert("Ops!", "Ocorreu um erro ao registrar a chegada.");
      console.error("handleArrivalRegister", error);
    }
  }

  useEffect(() => {
    getLastSyncTimestamp().then((lastSync) =>
      setDataNotSynced(historic!.update_at.getTime() > lastSync)
    );
  }, []);

  return (
    <Container>
      <Header title={title} />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>

        {dataNotSynced && <SyncMessage>Sincronização pendente</SyncMessage>}

        {historic?.status === "departure" && (
          <Footer>
            <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />

            <Button title="Registrar Chegada" onPress={handleArrivalRegister} />
          </Footer>
        )}
      </Content>
    </Container>
  );
}
