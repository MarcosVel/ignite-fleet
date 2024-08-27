import React from "react";
import { CarStatus, HomeHeader } from "../../components";
import { Container, Content } from "./styles";

export default function Home() {
  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus />
      </Content>
    </Container>
  );
}
