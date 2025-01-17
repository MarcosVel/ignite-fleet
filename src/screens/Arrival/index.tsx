import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { X } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ToastAndroid } from "react-native";
import { LatLng } from "react-native-maps";
import { BSON } from "realm";
import {
  Button,
  ButtonIcon,
  Header,
  Loading,
  Locations,
  Map,
} from "../../components";
import { LocationInfoProps } from "../../components/LocationInfo";
import {
  getLastSyncTimestamp,
  getStorageLocations,
} from "../../libs/asyncStorage";
import { useObject, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { stopLocationTask } from "../../tasks/backgroundLocTask";
import { getAddressLocation } from "../../utils";
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
  const [departure, setDeparture] = useState<LocationInfoProps>(
    {} as LocationInfoProps
  );
  const [arrival, setArrival] = useState<LocationInfoProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

      const locations = await getStorageLocations();

      realm.write(() => {
        historic.status = "arrival";
        historic.update_at = new Date();
        historic.coords.push(...locations);
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
    if (!historic) return;

    const lastSync = await getLastSyncTimestamp();
    const updatedAt = historic!.update_at.getTime();
    setDataNotSynced(updatedAt > lastSync);

    if (historic?.status === "departure") {
      const locationStorage = await getStorageLocations();
      setCoordinates(locationStorage);
    } else {
      const coordsOnDb = historic?.coords.map((coord) => {
        return {
          latitude: coord.latitude,
          longitude: coord.longitude,
          timestamp: coord.timestamp,
        };
      });
      setCoordinates(coordsOnDb ?? []);
    }

    if (historic?.coords[0]) {
      const departureStreetName = await getAddressLocation(historic?.coords[0]);
      setDeparture({
        label: dayjs(new Date(historic?.coords[0].timestamp)).format(
          "DD/MM/YYYY [às] HH:mm"
        ),
        address: `Saindo de ${departureStreetName ?? ""}`,
      });
    }

    if (historic?.status === "arrival") {
      const lastLocation = historic.coords[historic.coords.length - 1];
      const arrivalStreet = await getAddressLocation(lastLocation);

      setArrival({
        label: dayjs(new Date(lastLocation.timestamp)).format(
          "DD/MM/YYYY [às] HH:mm"
        ),
        address: `Chegando em ${arrivalStreet ?? ""}`,
      });
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getLocationInfo();
  }, [historic]);

  if (isLoading) {
    <Loading />;
  }

  return (
    <Container>
      <Header title={title} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}

      <Content>
        <Locations departure={departure} arrival={arrival} />

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
