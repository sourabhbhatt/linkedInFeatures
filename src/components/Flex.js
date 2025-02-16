import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Flex = () => {
  return (
    <View
      style={{
        backgroundColor: 'pink',
        flex: 1,
        justifyContent: 'space-around',
      }}>
      <View
        style={{
          backgroundColor: 'black',
          flex: 1,
        }}
      />
      <View
        style={{
          backgroundColor: 'gray',
          flex: 3,
        }}
      />
      <View
        style={{
          backgroundColor: 'pink',
          flex: 2,
        }}
      />
      <View
        style={{
          backgroundColor: 'yellow',
          flex: 2,
        }}
      />
    </View>
  );
};

export default Flex;

const styles = StyleSheet.create({});
