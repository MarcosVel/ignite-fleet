import "react-native-get-random-values";
import "./src/libs/dayjs";
import { REALM_APP_ID } from "@env";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { AppProvider, UserProvider } from "@realm/react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { Loading, TopMessage } from "./src/components";
import { RealmProvider, syncConfig } from "./src/libs/realm";
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
        <SafeAreaProvider style={{ backgroundColor: theme.COLORS.GRAY_800 }}>
          <StatusBar style="light" backgroundColor="transparent" translucent />

          <TopMessage />

          <UserProvider fallback={SignIn}>
            <RealmProvider
              sync={{
                ...syncConfig,
                initialSubscriptions: {
                  update(subs, realm) {
                    subs.add(realm.objects("Historic"));
                  },
                  rerunOnOpen: true,
                },
              }}
              fallback={Loading}
            >
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
