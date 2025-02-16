import 'react-native-gesture-handler';
import {AppRegistry, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import App from './App';
import {name as appName} from './app.json';

const WrappedApp = () => (
  <>
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <App />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  </>
);

AppRegistry.registerComponent(appName, () => WrappedApp);
