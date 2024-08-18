import { registerRootComponent } from "expo";
import "react-native-gesture-handler";
import { MainLayout } from "./main/layout";
import { NavigationContainer } from "@react-navigation/native";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  PaperProvider,
  adaptNavigationTheme,
  MD3LightTheme,
  MD3DarkTheme,
} from "react-native-paper";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import themes from '../../material-theme.json';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const lightThemeFromJson = themes.schemes.light;
const darkThemeFromJson = themes.schemes.dark;

// Ensure your JSON colors are correctly merging
const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    ...lightThemeFromJson,
  },
};

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    ...darkThemeFromJson,
  },
};

const queryClient = new QueryClient();

function RootLayout() {
  const colorScheme = useColorScheme();
  
  const theme =
    colorScheme === "dark"
      ? { ...CombinedDarkTheme }
      : { ...CombinedDefaultTheme };

  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <MainLayout />
        </QueryClientProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

registerRootComponent(RootLayout);
