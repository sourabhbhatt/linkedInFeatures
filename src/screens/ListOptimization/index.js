// Write a React Native component that displays a list of items fetched from an API.
// Each item should be rendered as a separate component, displaying its title and
// description.

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {memo, useCallback, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import ListCard from './ListCard';

const ListOptimization = () => {
  const postList = `https://jsonplaceholder.typicode.com/posts`;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const abortControllerRef = useRef(null);

  // Fetch data with AbortController for cleanup
  const getList = useCallback(async (page = 1, isRefreshing = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Cancel previous request
    }
    abortControllerRef.current = new AbortController();

    try {
      const response = await axios.get(`${postList}?_page=${page}&_limit=10`, {
        signal: abortControllerRef.current.signal,
      });
      if (isRefreshing) setList(response.data);
      else setList(prev => [...prev, ...response.data]);
      setHasMore(response.data.length > 0);
    } catch (error) {
      if (error.name !== 'CanceledError')
        console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      abortControllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    getList(page);
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort(); // Cleanup on unmount
    };
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    getList(1, true);
  }, []);

  const onEndReached = useCallback(() => {
    if (!loading && hasMore) {
      setLoading(true);
      setPage(prev => prev + 1);
      getList(page + 1);
    }
  }, [loading, hasMore, page]);

  // Memoize renderItem to avoid recreating the function on every render
  const renderItem = useCallback(({item, index}) => {
    return <ListCard item={item} index={index} />;
  }, []);

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List Optimization</Text>
      <FlatList
        data={list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && !refreshing ? (
            <ActivityIndicator style={styles.loader} />
          ) : null
        }
        initialNumToRender={10} 
        windowSize={21} // Reduce memory usage by rendering fewer items off-screen
        getItemLayout={(data, index) => ({
          length: 100, // Fixed height for each item
          offset: 100 * index,
          index,
        })}
      />
    </View>
  );
};

export default memo(ListOptimization);

const styles = StyleSheet.create({
  container: {flex: 1},
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    padding:10,
  },
  loader: {
    margin: 20,
  },
});
