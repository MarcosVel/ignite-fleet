import { useNavigation } from "@react-navigation/native";
import { useUser } from "@realm/react";
import dayjs from "dayjs";
import { CloudArrowUp } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, ToastAndroid } from "react-native";
import { ProgressDirection, ProgressMode } from "realm";
import {
  CarStatus,
  HistoricCard,
  HomeHeader,
  TopMessage,
} from "../../components";
import { HistoricCardProps } from "../../components/HistoricCard";
import {
  getLastSyncTimestamp,
  saveLastSyncTimestamp,
} from "../../libs/asyncStorage/syncStorage";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { Container, Content, EmptyList, Label } from "./styles";

export default function Home() {
  const realm = useRealm();
  const { id } = useUser();
  const { navigate } = useNavigation();

  const historic = useQuery(Historic);

  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>(
    []
  );
  const [percentageToSync, setPercentageToSync] = useState<string | null>(null);

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate("arrival", { id: vehicleInUse._id.toString() });
    }

    navigate("departure");
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (err) {
      Alert.alert(
        "Veículo em uso",
        "Não foi possível carregar o veículo em uso."
      );
      console.error(err);
    }
  }

  async function fetchHistory() {
    try {
      const response = historic.filtered(
        "status = 'arrival' SORT(create_at DESC)"
      );

      const lastSync = await getLastSyncTimestamp();

      const historicFormatted = response.map((item) => {
        return {
          id: item._id.toString(),
          licensePlate: item.license_plate,
          created: dayjs(item.create_at).format(
            "[Saída em] DD/MM/YYYY [às] HH:mm"
          ),
          isSync: lastSync > item.update_at.getTime(),
        };
      });

      setVehicleHistoric(historicFormatted);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro no Histórico",
        "Não foi possível carregar o histórico."
      );
    }
  }

  function handleHistoricDetails(id: string) {
    navigate("arrival", { id });
  }

  async function progressNotification(
    transferred: number,
    transferable: number
  ) {
    const transferredString = transferred.toString().slice(0, -1);
    const transferableString = transferable.toString().slice(0, -1);

    const percentage =
      (Number(transferredString) / Number(transferableString)) * 100;

    if (percentage === 100) {
      await saveLastSyncTimestamp();
      await fetchHistory();
      setPercentageToSync(null);

      return ToastAndroid.show("Dados sincronizados!", ToastAndroid.SHORT);
    }

    if (percentage < 100) {
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`);
    }
  }

  useEffect(() => {
    fetchVehicleInUse();

    realm.addListener("change", () => fetchVehicleInUse());

    return () => {
      if (realm && !realm.isClosed)
        realm.removeListener("change", fetchVehicleInUse);
    };
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [historic]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects("Historic")
        .filtered(`user_id = '${id}'`);

      mutableSubs.add(historicByUserQuery, { name: "historic_by_user" });
    });
  }, [realm]);

  useEffect(() => {
    const syncSession = realm.syncSession;

    if (!syncSession) return;

    syncSession.addProgressNotification(
      ProgressDirection.Upload,
      ProgressMode.ReportIndefinitely,
      progressNotification
    );

    return () => syncSession.removeProgressNotification(progressNotification);
  }, []);

  return (
    <Container>
      <HomeHeader />

      {percentageToSync && (
        <TopMessage title={percentageToSync} icon={CloudArrowUp} />
      )}

      <Content>
        <CarStatus
          onPress={handleRegisterMovement}
          licensePlate={vehicleInUse?.license_plate}
        />

        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 96, gap: 16 }}
          ListHeaderComponent={() => <Label>Histórico</Label>}
          ListEmptyComponent={() => (
            <EmptyList>Nenhum veículo utilizado</EmptyList>
          )}
        />
      </Content>
    </Container>
  );
}
