import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import { Alert } from "react-native";
import BackgroundImg from "../../assets/background.png";
import { Button } from "../../components";
import { Container, Slogan, Title } from "./styles";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
});

export default function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true);
      const response = await GoogleSignin.signIn();
      console.log(response);

      setIsAuthenticating(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Ops!", "Não foi possível conectar com sua conta google");
      setIsAuthenticating(false);
    }
  }

  return (
    <Container source={BackgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entrar com Google"
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  );
}
