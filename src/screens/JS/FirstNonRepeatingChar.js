import React, {memo, useCallback, useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';

import styles from './Styles';
import Button from '../../components/Button';
import {Logger} from '../../utils/Logger';

const firstNonRepeatingChar = memo(() => {
  const input = 'aabbcdd';
  const [result, setResult] = useState();
  const [logs, setLogs] = useState([]);

  const updateLogs = useCallback(
    data => setLogs(prev => [prev, data]),
    [setLogs],
  );

  const resultFunction = () => {
    clearResult();
    updateLogs(Logger(`Analyzing input:`)(input));
    for (let char of input) {
      updateLogs(Logger(input.indexOf(char))(input.lastIndexOf(char)));
      if (input.indexOf(char) === input.lastIndexOf(char)) {
        updateLogs(Logger('output')(char));
        return setResult(char);
      }
    }
    return setResult(null);
  };

  const clearResult = useCallback(() => {
    setResult();
    setLogs([]);
  }, [setResult, setLogs]);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {`Given a string, return the first non-repeating character. If none exist, return null.`}
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

export default firstNonRepeatingChar;
