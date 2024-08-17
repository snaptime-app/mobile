import { registerRootComponent } from 'expo';
import App from './App';

function RootLayout() {
  return <App />;
}

registerRootComponent(RootLayout);
