import { Home } from './home';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

const Tab = createMaterialBottomTabNavigator();

export function MainLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: 'home',
        tabBarLabel: 'Home',
      }} />
    </Tab.Navigator>
  );
}
