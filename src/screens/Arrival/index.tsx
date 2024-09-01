import { useRoute } from "@react-navigation/native";
import React from "react";
import { Container, Title } from "./styles";

type RouteParamsProps = {
  id: string;
};

export default function Arrival() {
  const { params } = useRoute();
  const { id } = params as RouteParamsProps;

  console.log(id);

  return (
    <Container>
      <Title>index</Title>
    </Container>
  );
}
