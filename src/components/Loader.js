import React from 'react';
import {View, ActivityIndicator, Modal, StyleSheet, Text} from 'react-native';

const Loader = ({
  visible = false,
  size = 'large',
  color = '#007AFF',
  overlay = false,
  message = '',
  style,
}) => {
  if (!visible) return null;

  return overlay ? (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={size} color={color} />
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  ) : (
    <View style={[styles.inlineContainer, style]}>
      <ActivityIndicator size={size} color={color} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  inlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
  },
});

export default Loader;
