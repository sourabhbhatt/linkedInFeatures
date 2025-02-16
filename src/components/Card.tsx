/**
 * Dependency imports
 */
import React from 'react';
import {StyleSheet, Text, View, ViewProps, Image} from 'react-native';

/**
 * Local imports
 */

/**
 * Styles
 */
const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1.33,
    borderRadius: 5,
  },
  cardInfo: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardLikes: {
    opacity: 0.35,
    fontSize: 13,
    fontWeight: 'bold',
  },
  fadedCard: {
    opacity: 0.4,
  },
});

/**
 * Component(s)
 */
export interface CardProps {
  image: string;
  title: string;
  likes: string;
  loading: boolean;
}

const Card: React.FC<CardProps & ViewProps> = ({
  style,
  image,
  title,
  likes,
  loading,
  ...props
}) => {
  return (
    <View style={[styles.root, style, loading && styles.fadedCard]} {...props}>
      <Image source={{uri: image}} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardLikes}>{likes} likes</Text>
      </View>
    </View>
  );
};

export default Card;
