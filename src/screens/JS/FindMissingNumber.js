// FindMissingNumber

import React, {memo, useCallback, useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';

import styles from './Styles';
import Button from '../../components/Button';
import {Logger} from '../../utils/Logger';

const FindMissingNumber = memo(() => {
  const input = [1, 2, 4, 5];
  const [result, setResult] = useState();
  const [logs, setLogs] = useState([]);

  const updateLogs = useCallback(
    data => setLogs(prev => [prev, data]),
    [setLogs],
  );

  const resultFunction = () => {
    /* The formula for the sum of the first \(n\) natural numbers 
    is \(S=\frac{n(n+1)}{2}\), where \(n\) is the natural number.  */
    clearResult();
    updateLogs(Logger(`Analyzing input:`)(input));
    const n = input.length + 1; // because question says- from 1 to n+1
    const expectedSum = (n * (n + 1)) / 2;
    updateLogs(Logger(`expectedSum:`)(expectedSum));
    const actualSum = input.reduce((acc, num) => acc + num, 0);
    updateLogs(Logger(`actualSum:`)(actualSum));
    const result = expectedSum - actualSum;
    updateLogs(Logger(`Result:`)(result));
    setResult(result);
  };

  const clearResult = useCallback(() => {
    setResult();
    setLogs([]);
  }, [setResult, setLogs]);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {`An array contains n unique numbers from 1 to n+1, but one number is missing. Find the missing number.`}
      </Text>
      <Text style={styles.example}>{JSON.stringify(input)}</Text>
      <Button
        title="Get Result"
        style={styles.btn}
        titleStyle={styles.btnText}
        onPress={resultFunction}
      />
      {!!result && (
        <Text style={styles.result}>{`Result ::: ${JSON.stringify(
          result,
        )}`}</Text>
      )}

      {logs.length > 0 && (
        <FlatList
          data={logs}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item, i}) => (
            <Text style={styles.loggerText}>{item}</Text>
          )}
        />
      )}

      <Pressable style={styles.clearBtn} onPress={clearResult}>
        <Text style={styles.clearTxt}>Clear Result</Text>
      </Pressable>
    </View>
  );
});

export default FindMissingNumber;
