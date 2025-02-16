import React from 'react';
import {StatusBar} from 'react-native';
import colors from './src/utils/colors';
import StackNavigator from './src/screens/Navigations/StackNavigator';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.pulltoRef}
        translucent={false}
      />
      <StackNavigator />
    </>
  );
};

export default App;
