import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import JS from '../JS';
import HomeScreen from '../HomeScreen';
import UserProFileInfo from '../UserProFileInfo';
import ListOptimization from '../ListOptimization';
import {getItem, setItem} from '../../utils/storage';
import NativeModuleExample from '../NativeModuleExample';
import pullToRefreshAnimation from '../PullToRefreshAnimation';
import {View} from 'react-native';
import Loader from '../../components/Loader';

const Stack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const StackNavigator = () => {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState(null);

  useEffect(() => {
    const restoreState = () => {
      try {
        const savedState = getItem(PERSISTENCE_KEY);
        if (savedState) setInitialState(savedState);
      } catch (error) {
        console.error('Failed to restore navigation state', error);
      }
      setIsReady(true);
    };
    restoreState();
  }, []);

  if (!isReady) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Loader
          visible={true}
          size="small"
          color="#000"
          message={'Loading App State...'}
        />
      </View>
    );
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state => setItem(PERSISTENCE_KEY, state)}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="NativeModuleExample"
          component={NativeModuleExample}
        />
        <Stack.Screen
          name="pullToRefreshAnimation"
          component={pullToRefreshAnimation}
        />
        <Stack.Screen name="listOptimization" component={ListOptimization} />
        <Stack.Screen name="userProFileInfo" component={UserProFileInfo} />
        <Stack.Screen name="jsBasics" component={JS} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
