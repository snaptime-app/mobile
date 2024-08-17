import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';
import { MainLayout } from './main/layout';
import { NavigationContainer } from '@react-navigation/native';

function RootLayout() {
  return (
    <NavigationContainer>
      <MainLayout />
    </NavigationContainer>
  );
}

registerRootComponent(RootLayout);
