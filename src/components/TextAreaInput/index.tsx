import React from "react";
import { TextInputProps } from "react-native";
import { Container, Input, Label } from "./styles";

type Props = TextInputProps & {
  label: string;
};

export default function TextAreaInput({ label, ...rest }: Props) {
  return (
    <Container>
      <Label>{label}</Label>

      <Input multiline autoCapitalize="sentences" {...rest} />
    </Container>
  );
}
