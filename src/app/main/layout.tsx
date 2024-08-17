import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './home';

const Stack = createStackNavigator();

export function MainLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
