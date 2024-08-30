import { useNavigation } from "@react-navigation/native";
import React from "react";
import { CarStatus, HomeHeader } from "../../components";
import { Container, Content } from "./styles";

export default function Home() {
  const { navigate } = useNavigation();

  function handleRegisterMovement() {
    navigate("departure");
  }

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus onPress={handleRegisterMovement} />
      </Content>
    </Container>
  );
}
