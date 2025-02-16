import React, {memo, useCallback, useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';

import styles from './Styles';
import Button from '../../components/Button';
import {Logger} from '../../utils/Logger';

const FindLongestSubstring = memo(() => {
  const input = 'abcabcbb';
  const [result, setResult] = useState();
  const [logs, setLogs] = useState([]);

  const updateLogs = useCallback(
    data => setLogs(prev => [prev, data]),
    [setLogs],
  );

  const resultFunction = () => {
    clearResult();
    updateLogs(Logger(`Analyzing input:`)(input));
    let charSet = new Set();
    let left = 0,
      maxLength = 0;

    for (let right = 0; right < input.length; right++) {
      while (charSet.has(input[right])) {
        charSet.delete(input[left]);
        left++;
      }
      charSet.add(input[right]);
      maxLength = Math.max(maxLength, right - left + 1);
    }
    updateLogs(Logger(`Output:`)(maxLength));
    setResult(maxLength);
  };

  const clearResult = useCallback(() => {
    setResult();
    setLogs([]);
  }, [setResult, setLogs]);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {`Find the Longest Substring Without Repeating Characters`}
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

export default FindLongestSubstring;
