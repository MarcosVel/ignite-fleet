import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { CarStatus, HomeHeader } from "../../components";
import { useQuery } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { Container, Content } from "./styles";
import { Alert } from "react-native";

export default function Home() {
  const { navigate } = useNavigation();

  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  const historic = useQuery(Historic);

  function handleRegisterMovement() {
    navigate("departure");
  }

  function fetchVehicle() {
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
    fetchVehicle();
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
