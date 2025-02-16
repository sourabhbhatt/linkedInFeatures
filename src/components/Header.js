import React from 'react';
import colors from '../utils/colors';
import {StyleSheet, Text, View} from 'react-native';

const Header = ({title = '', style = {}, titleStyle = {}}) => {
  return (
    <View style={{...styles.header, ...style}}>
      <Text style={{...styles.title, ...titleStyle}}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pulltoRef,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
