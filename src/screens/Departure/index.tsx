import React from "react";
import { Header, LicensePlateInput } from "../../components";
import { Container, Content } from "./styles";

export default function Departure() {
  return (
    <Container>
      <Header title="Saída" />

      <Content>
        <LicensePlateInput label="Placa do veículo" placeholder="QLX2360" />
      </Content>
    </Container>
  );
}
