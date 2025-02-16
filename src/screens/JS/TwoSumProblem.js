import React, {memo, useCallback, useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';

import styles from './Styles';
import Button from '../../components/Button';
import {Logger} from '../../utils/Logger';

const TwoSumProblem = memo(() => {
  const input = [1, 2, 3, 4, 7];
  const target = 10;
  const [result, setResult] = useState();
  const [logs, setLogs] = useState([]);

  const updateLogs = useCallback(
    data => setLogs(prev => [prev, data]),
    [setLogs],
  );

  const resultFunction = () => {
    clearResult();
    updateLogs(Logger(`Analyzing input:`)(input));
    let map = new Map();
    for (let i = 0; i < input.length; i++) {
      const complement = target - input[i];
      updateLogs(Logger(`complement:`)(complement));
      if (map.has(complement)) {
        updateLogs(Logger(`Output Indexes:`)([map.get(complement), i]));
        setResult([map.get(complement), i]);
        return;
      }
      map.set(input[i], i);
    }
    setResult(null);
  };

  const clearResult = useCallback(() => {
    setResult();
    setLogs([]);
  }, [setResult, setLogs]);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {`Given an array of numbers and a target sum, return the indices of the two numbers that add up to the target.`}
      </Text>
      <Text style={styles.example}>{JSON.stringify(input)}</Text>
      <Text style={styles.example}>{`target:: ${JSON.stringify(target)}`}</Text>
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

export default TwoSumProblem;
