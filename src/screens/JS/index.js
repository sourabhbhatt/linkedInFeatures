import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import LargetsNumer from './LargetsNumer';
import Header from '../../components/Header';
import FizzBuzz from './FizzBuzz';
import RemoveDuplicates from './RemoveDuplicates';
import FirstNonRepeatingChar from './FirstNonRepeatingChar';
import FindMissingNumber from './FindMissingNumber';
import FindIntersection from './FindIntersection';
import TwoSumProblem from './TwoSumProblem';
import FindLongestSubstring from './FindLongestSubstring';

const Index = () => {
  const data = [
    { id: 'largetsNumer', component: LargetsNumer },
    { id: 'fizzBuzz', component: FizzBuzz },
    { id: 'removeDuplicates', component: RemoveDuplicates },
    { id: 'firstNonRepeatingChar', component: FirstNonRepeatingChar },
    { id: 'findMissingNumber', component: FindMissingNumber },
    { id: 'findIntersection', component: FindIntersection },
    { id: 'twoSumProblem', component: TwoSumProblem },
    { id: 'findLongestSubstring', component: FindLongestSubstring },
  ];

  return (
    <View style={styles.container}>
      <Header title="JavaScript Basics" style={{ marginBottom: 10 }} />
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const ItemComponent = item.component;
          return <ItemComponent />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',

  },
});
