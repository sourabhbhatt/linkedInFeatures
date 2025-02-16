// NativeModuleExample

import React, {useEffect, FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
} from 'react-native';

import colors from '../../utils/colors';
import Button from '../../components/Button';

const {MyKotlinModule} = NativeModules;
const eventEmitter = new NativeEventEmitter(MyKotlinModule);

const NativeModuleExample: FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = eventEmitter.addListener('handleback', () => {
      navigation.navigate('Profile'); // Navigate when event is received
    });
    return () => subscription.remove(); // Cleanup
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text
        style={
          styles.title
        }>{`🚀 Working with Native Modules is an Adventure!`}</Text>
      <Text style={styles.subtitle}>
        Seamless integration between React Native & Kotlin
      </Text>
      <Button
        icon="😍"
        title="Open Kotlin Screen"
        onPress={() => MyKotlinModule.openNativeScreen()}
        style={styles.btn}
      />
    </View>
  );
};

export default NativeModuleExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.heading,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.heading,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  btn: {
    padding: 12,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
