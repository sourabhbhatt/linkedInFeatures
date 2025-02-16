import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';

import styles from './Styles';
import Button from '../../components/Button';

const FizzBuzz = () => {
  const n = 15;
  const [result, setResult] = useState();

  const resulrFunction = () => {
    const output = [];
    for (let i = 1; i <= n; i++) {
      if (i % 3 === 0 && i % 5 === 0) output.push('FizzBuzz');
      else if (i % 3 === 0) output.push('Fizz');
      else if (i % 5 === 0) output.push('Buzz');
      else output.push(i.toString());
    }
    setResult(output);
  };

  const clearResult = () => setResult();

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {`Print numbers from 1 to n. If a number is divisible by 3, print "Fizz", if divisible by 5, print "Buzz", and if divisible by both 3 and 5, print "FizzBuzz".`}
      </Text>
      <Text style={styles.example}>{JSON.stringify(n)}</Text>
      <Button
        title="Get Result"
        style={styles.btn}
        titleStyle={styles.btnText}
        onPress={resulrFunction}
      />
      {!!result && (
        <Text style={styles.result}>{`Result ::: ${JSON.stringify(
          result,
        )}`}</Text>
      )}
      <Pressable style={styles.clearBtn} onPress={clearResult}>
        <Text style={styles.clearTxt}>Clear Result</Text>
      </Pressable>
    </View>
  );
};

export default FizzBuzz;
