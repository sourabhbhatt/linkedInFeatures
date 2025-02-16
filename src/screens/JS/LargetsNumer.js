import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';

import styles from './Styles';
import Button from '../../components/Button';

const LargetsNumer = () => {
  const arr = [10, 20, 30, 5];
  const [result, setResult] = useState();

  const findMax = () => {
    // setResult(Math.max(...arr));
    // polifil
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
      max = max < arr[i] ? arr[i] : max;
    }
    setResult(max);
  };

  const clearResult = () => setResult();

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Find the Largest Number in an Array</Text>
      <Text style={styles.example}>{JSON.stringify(arr)}</Text>
      <Button
        title="Get Result"
        style={styles.btn}
        titleStyle={styles.btnText}
        onPress={findMax}
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

export default LargetsNumer;
