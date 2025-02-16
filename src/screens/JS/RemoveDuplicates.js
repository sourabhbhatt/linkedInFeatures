import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';

import styles from './Styles';
import Button from '../../components/Button';

const RemoveDuplicates = () => {
  const input = [1, 2, 3, 2, 4, 1];
  const [result, setResult] = useState();
  const [duplicates, setDuplicates] = useState();

  const resultFunction = () => {
    const unique = [...new Set(input)];
    setResult(unique);
  };

  const findDuplicates = () => {
    const output = [];
    const duplicates = [];
    for (let i = 0; i < input.length; i++) {
      if (output.includes(input[i])) {
        duplicates.push(input[i]);
      } else output.push(input[i]);
    }
    setDuplicates(duplicates);
  };

  const clearResult = () => setResult();

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {`Write a function that removes duplicate values from an array.`}
      </Text>
      <Text style={styles.example}>{JSON.stringify(input)}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title="Get Result"
          style={styles.btn}
          titleStyle={styles.btnText}
          onPress={resultFunction}
        />
        <Button
          title="Get Duplicates"
          style={styles.btn}
          titleStyle={styles.btnText}
          onPress={findDuplicates}
        />
      </View>
      {!!result && (
        <Text style={styles.result}>{`Result ::: ${JSON.stringify(
          result,
        )}`}</Text>
      )}
      {!!duplicates && (
        <Text style={styles.result}>{`duplicates ::: ${JSON.stringify(
          duplicates,
        )}`}</Text>
      )}
      <Pressable style={styles.clearBtn} onPress={clearResult}>
        <Text style={styles.clearTxt}>Clear Result</Text>
      </Pressable>
    </View>
  );
};

export default RemoveDuplicates;
