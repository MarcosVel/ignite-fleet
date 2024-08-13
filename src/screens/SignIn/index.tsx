import React from "react";
import BackgroundImg from "../../assets/background.png";
import { Container, Slogan, Title } from "./styles";

export default function index() {
  return (
    <Container source={BackgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>
    </Container>
  );
}
