import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useApp, useUser } from "@realm/react";
import { Power } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import theme from "../../theme";
import {
  Container,
  Greeting,
  Message,
  Name,
  Picture,
  SafeArea,
} from "./styles";

export default function HomeHeader() {
  const { profile } = useUser();
  const app = useApp();

  function handleLogout() {
    GoogleSignin.signOut();
    app.currentUser?.logOut();
  }

  return (
    <SafeArea>
      <Container>
        <Picture
          source={{ uri: profile.pictureUrl }}
          placeholder="L184i9ofbHof00ayjtay~qj[fQj["
        />

        <Greeting>
          <Message>Olá,</Message>
          <Name>{profile.firstName}</Name>
        </Greeting>

        <TouchableOpacity onPress={handleLogout}>
          <Power size={32} color={theme.COLORS.GRAY_400} />
        </TouchableOpacity>
      </Container>
    </SafeArea>
  );
}
