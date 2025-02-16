import React, {memo, useCallback, useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';

import styles from './Styles';
import Button from '../../components/Button';
import {Logger} from '../../utils/Logger';

const FindIntersection = memo(() => {
  const input = [1, 2, 3, 4];
  const input2 = [2, 4, 6];
  const [result, setResult] = useState();
  const [logs, setLogs] = useState([]);

  const updateLogs = useCallback(
    data => setLogs(prev => [prev, data]),
    [setLogs],
  );

  const resultFunction = () => {
    clearResult();
    updateLogs(Logger(`Analyzing input:`)(input));
    const numbers = input.filter(el => input2.includes(el));
    updateLogs(Logger(`numbers:`)(numbers));
    setResult(numbers);
  };

  const clearResult = useCallback(() => {
    setResult();
    setLogs([]);
  }, [setResult, setLogs]);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {`Return an array of common elements between two given arrays.`}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <Text style={styles.example}>{JSON.stringify(input)}</Text>
        <Text style={styles.example}>{` ${JSON.stringify(input2)}`}</Text>
      </View>
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

export default FindIntersection;
