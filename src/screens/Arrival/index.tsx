import { useNavigation, useRoute } from "@react-navigation/native";
import { X } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ToastAndroid } from "react-native";
import { LatLng } from "react-native-maps";
import { BSON } from "realm";
import { Button, ButtonIcon, Header, Map } from "../../components";
import {
  getLastSyncTimestamp,
  getStorageLocations,
} from "../../libs/asyncStorage";
import { useObject, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { stopLocationTask } from "../../tasks/backgroundLocTask";
import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
  SyncMessage,
} from "./styles";

type RouteParamsProps = {
  id: string;
};

export default function Arrival() {
  const realm = useRealm();
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { id } = params as RouteParamsProps;

  const [dataNotSynced, setDataNotSynced] = useState(false);
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string);

  const title = historic?.status === "arrival" ? "Chegada" : "Detalhes";

  function handleRemoveVehicleUsage() {
    Alert.alert("Cancelar", "Deseja cancelar a utilização do veículo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => removeVehicleUsage() },
    ]);
  }

  async function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    });

    await stopLocationTask();

    ToastAndroid.show("Utilização cancelada!", ToastAndroid.SHORT);

    goBack();
  }

  async function handleArrivalRegister() {
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

      await stopLocationTask();

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

  async function getLocationInfo() {
    const lastSync = await getLastSyncTimestamp();
    const updatedAt = historic!.update_at.getTime();
    setDataNotSynced(updatedAt > lastSync);

    const locationStorage = await getStorageLocations();
    setCoordinates(locationStorage);
  }

  useEffect(() => {
    getLocationInfo();
  }, [historic]);

  return (
    <Container>
      <Header title={title} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}

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
