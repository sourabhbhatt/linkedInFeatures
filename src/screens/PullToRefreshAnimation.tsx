import React, {FC, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {
  Image,
  PanResponder,
  StyleSheet,
  View,
  ViewProps,
  FlatList,
  StatusBar,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

import data from '../assets/data.json';
import Card from '../components/Card';
import ASSETS from '../assets/AssetManager';
import animatedLogo from '../assets/images/loadingShow.gif';
import refreshIcon from '../assets/images/refresh-icon.png';
import colors from '../utils/colors';
import Header from '../components/Header';
import babelConfig from '../../babel.config';
// import Flex from '../components/Flex';

export interface pullToRefreshAnimationProps {}

const MAX_PULL_DISTANCE = 150; // Maximum pull distance for refresh
const REFRESH_THRESHOLD = MAX_PULL_DISTANCE / 2; // Threshold to trigger refresh
const REFRESH_ANIMATION_DURATION = 180; // Duration for animations
const REFRESH_ICON_SIZE = 36; // Refresh icon dimensions

const PullToRefreshAnimation: FC<
  pullToRefreshAnimationProps & ViewProps
> = () => {
  // Shared values for animation
  const scrollPosition = useSharedValue(0);
  const pullDownPosition = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);

  const [refreshing, setRefreshing] = useState(false);

  // Function to simulate refreshing data
  const onRefresh = (done: () => void) => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      done();
    }, 2000); // Simulated refresh duration
  };

  // Handles release of the pull-down gesture
  const onPanRelease = () => {
    // Animate pull-down position back to original state
    pullDownPosition.value = withTiming(
      isReadyToRefresh.value ? REFRESH_ICON_SIZE * 2 : 0,
      {duration: REFRESH_ANIMATION_DURATION},
    );

    if (isReadyToRefresh.value) {
      isReadyToRefresh.value = false;

      const onRefreshComplete = () => {
        pullDownPosition.value = withTiming(0, {
          duration: REFRESH_ANIMATION_DURATION,
        });
      };

      onRefresh(onRefreshComplete);
    }
  };

  // Gesture recognizer for handling pull-down interactions
  const panResponderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) =>
        scrollPosition.value <= 0 && gestureState.dy > 0,
      onPanResponderMove: (event, gestureState) => {
        // Update pull-down position within allowed range
        pullDownPosition.value = Math.min(
          MAX_PULL_DISTANCE,
          Math.max(0, gestureState.dy),
        );

        // Update refresh readiness state
        isReadyToRefresh.value = pullDownPosition.value >= REFRESH_THRESHOLD;
      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    }),
  );

  // Track scroll position
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  // Animated styles for pull-down effect
  const pullDownStyles = useAnimatedStyle(() => ({
    transform: [{translateY: pullDownPosition.value}],
  }));

  // Animated styles for refresh container height
  const refreshContainerStyles = useAnimatedStyle(() => ({
    height: pullDownPosition.value,
  }));

  // Animated styles for refresh icon
  const refreshIconStyles = useAnimatedStyle(() => {
    const scale = Math.min(1, pullDownPosition.value / REFRESH_ICON_SIZE);
    return {
      opacity: refreshing
        ? withDelay(100, withTiming(0, {duration: 20}))
        : Math.max(0, pullDownPosition.value - 25) / 50,
      transform: [
        {scaleX: refreshing ? withTiming(0.15, {duration: 120}) : scale},
        {scaleY: scale},
        {rotate: `${pullDownPosition.value * 3}deg`},
      ],
      backgroundColor: refreshing ? '#fff' : 'transparent',
    };
  });

  return (
    <>
      <Header title={'Pull to refresh demo'} />
      <View
        pointerEvents={refreshing ? 'none' : 'auto'}
        style={styles.container}>
        {/* Pull-down refresh container */}
        <Animated.View
          style={[styles.refreshContainer, refreshContainerStyles]}>
          {refreshing ? (
            <LottieView
              source={ASSETS.animatedLogo}
              autoPlay
              loop
              style={styles.logo}
            />
          ) : (
            <Animated.Image
              source={refreshIcon}
              style={[styles.refreshIcon, refreshIconStyles]}
            />
          )}
        </Animated.View>

        {/* Main content area with pull-down effect */}
        <Animated.View
          style={[styles.contentWrapper, pullDownStyles]}
          {...panResponderRef.current.panHandlers}>
          <Animated.FlatList
            data={data}
            keyExtractor={item => item.id}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            contentContainerStyle={styles.flatListContent}
            renderItem={({item, index}) => (
              <Card
                loading={refreshing}
                index={index}
                image={item.image}
                title={item.title}
                likes={item.likes}
              />
            )}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default PullToRefreshAnimation;

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pulltoRef,
  },
  refreshContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 280,
    height: '100%',
  },
  refreshIcon: {
    position: 'absolute',
    width: REFRESH_ICON_SIZE,
    height: REFRESH_ICON_SIZE,
    borderRadius: REFRESH_ICON_SIZE / 2,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: colors.pulltoRef,
  },
  itemSeparator: {
    height: 20,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
});
