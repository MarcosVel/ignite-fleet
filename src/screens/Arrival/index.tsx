import { useRoute } from "@react-navigation/native";
import React from "react";
import { Button, Header } from "../../components";
import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from "./styles";

type RouteParamsProps = {
  id: string;
};

export default function Arrival() {
  const { params } = useRoute();
  const { id } = params as RouteParamsProps;

  console.log(id);

  return (
    <Container>
      <Header title="Chegada" />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>XXX0000</LicensePlate>

        <Label>Finalidade</Label>
        <Description>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
          perferendis sapiente officiis odio dolorum placeat, distinctio
          facilis. Iusto nemo, voluptatibus beatae temporibus, quis, neque
          tenetur hic numquam aut magni iure!
        </Description>

        <Footer>
          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </Container>
  );
}
