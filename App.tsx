import { ANDROID_CLIENT_ID } from "@env";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { Loading } from "./src/components";
import { SignIn } from "./src/screens";
import theme from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) {
    return <Loading />;
  }

  console.log("ANDROID_CLIENT_ID", ANDROID_CLIENT_ID);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <SignIn />
    </ThemeProvider>
  );
}
