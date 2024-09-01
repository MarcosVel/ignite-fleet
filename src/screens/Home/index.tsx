import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { CarStatus, HomeHeader } from "../../components";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { Container, Content } from "./styles";

export default function Home() {
  const realm = useRealm();
  const { navigate } = useNavigation();

  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  const historic = useQuery(Historic);

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

  useEffect(() => {
    fetchVehicleInUse();

    realm.addListener("change", () => fetchVehicleInUse());

    return () => realm.removeListener("change", fetchVehicleInUse);
  }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          onPress={handleRegisterMovement}
          licensePlate={vehicleInUse?.license_plate}
        />
      </Content>
    </Container>
  );
}
