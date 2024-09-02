import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { CarStatus, HistoricCard, HomeHeader } from "../../components";
import { HistoricCardProps } from "../../components/HistoricCard";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { Container, Content, EmptyList, Label } from "./styles";

export default function Home() {
  const realm = useRealm();
  const { navigate } = useNavigation();

  const historic = useQuery(Historic);

  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>(
    []
  );

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate("arrival", { id: vehicleInUse._id.toString() });
    }

    navigate("departure");
  }

  function fetchVehicleInUse() {
    console.log(historic);

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

  function fetchHistory() {
    try {
      const response = historic.filtered(
        "status = 'arrival' SORT(create_at DESC)"
      );

      const historicFormatted = response.map((item) => {
        return {
          id: item._id.toString(),
          licensePlate: item.license_plate,
          created: dayjs(item.create_at).format(
            "[Saída em] DD/MM/YYYY [às] HH:mm"
          ),
          isSync: false,
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

  return (
    <Container>
      <HomeHeader />

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
          contentContainerStyle={{ paddingBottom: 96 }}
          ListHeaderComponent={() => <Label>Histórico</Label>}
          ListHeaderComponentStyle={{ marginBottom: 12 }}
          ListEmptyComponent={() => (
            <EmptyList>Nenhum veículo utilizado</EmptyList>
          )}
        />
      </Content>
    </Container>
  );
}
