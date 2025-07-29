/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { MenuProvider } from 'react-native-popup-menu';

export default function Main() {
  return (
    <MenuProvider>
      <App />
    </MenuProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);