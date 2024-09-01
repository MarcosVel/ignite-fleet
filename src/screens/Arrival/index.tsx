import { useRoute } from "@react-navigation/native";
import React from "react";
import { Button, ButtonIcon, Header } from "../../components";
import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from "./styles";
import { X } from "phosphor-react-native";
import { useObject } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { BSON } from "realm";

type RouteParamsProps = {
  id: string;
};

export default function Arrival() {
  const { params } = useRoute();
  const { id } = params as RouteParamsProps;
  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string);

  return (
    <Container>
      <Header title="Chegada" />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>

        <Footer>
          <ButtonIcon icon={X} />

          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </Container>
  );
}
