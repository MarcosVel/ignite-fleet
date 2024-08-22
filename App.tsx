import { REALM_APP_ID } from "@env";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { AppProvider, UserProvider } from "@realm/react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { Loading } from "./src/components";
import { Routes } from "./src/routes";
import { SignIn } from "./src/screens";
import theme from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <UserProvider fallback={SignIn}>
          <Routes />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
