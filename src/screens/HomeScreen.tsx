import React, {FC, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, View, ToastAndroid} from 'react-native';

import colors from '../utils/colors';
import Button from '../components/Button';
import Header from '../components/Header';

const featureButtons = [
  {icon: '💁', title: 'Checkout Native Module', screen: 'NativeModuleExample'},
  {
    icon: '🤑',
    title: 'Custom Pull-to-Refresh',
    screen: 'pullToRefreshAnimation',
  },
  {icon: '📋', title: 'List optimization', screen: 'listOptimization'},
  {icon: '🕹', title: 'Game UI Showcase', screen: ''},
  {icon: '🎬', title: 'Lottie Animations', screen: ''},
  {icon: '⚡', title: 'Reanimated Transitions', screen: ''},
  {icon: '🗺', title: 'Map & Geolocation', screen: ''},
  {icon: '🎤', title: 'Speech-to-Text Demo', screen: ''},
  {icon: '📹', title: 'Camera & Filters', screen: ''},
  {icon: '📄', title: 'PDF Viewer', screen: ''},
  {icon: '🔗', title: 'Deep Linking', screen: ''},
  {
    icon: '🚀',
    title: 'Performance Optimization',
    screen: 'PerformanceOptimization',
  },
  {icon: '💾', title: 'Async Storage Demo', screen: 'AsyncStorageScreen'},
  {icon: '💾', title: 'User ProFile Info', screen: 'userProFileInfo'},
  {icon: '💾', title: 'JS BASICS', screen: 'jsBasics'},
];

const HomeScreen: FC = () => {
  const navigation = useNavigation();

  const handleNavigation = useCallback(
    (screenName: string) => {
      if (screenName) navigation.navigate(screenName as never);
      else {
        console.warn('Navigation Error:');
        ToastAndroid.show(`🚧 ---- coming soon!`, ToastAndroid.SHORT);
      }
    },
    [navigation],
  );

  const renderButton = ({item}: {item: (typeof featureButtons)[0]}) => (
    <Button
      icon={item.icon}
      title={item.title}
      style={styles.button}
      onPress={() => handleNavigation(item.screen)}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Skills and Demos" />
      <FlatList
        data={featureButtons}
        keyExtractor={(item, i) => i.toString()}
        renderItem={renderButton}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  button: {
    marginBottom: 12,
  },
});
