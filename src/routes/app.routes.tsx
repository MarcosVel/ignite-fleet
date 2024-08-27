import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Departure, Home } from "../screens";
import theme from "../theme";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: theme.COLORS.GRAY_800,
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="departure" component={Departure} />
    </Navigator>
  );
}
