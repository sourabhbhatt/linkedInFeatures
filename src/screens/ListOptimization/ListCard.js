import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
import axios from 'axios';
const postCommentDetails = `https://jsonplaceholder.typicode.com/posts/`;

const ListCard = ({item, index}) => {
  const {id, title, userId, body} = item;
  const [loading, setLoading] = useState(false);
  const [commentDetails, setCommentDetails] = useState([]);

  const getComments = postId => {
    setLoading(true);
    axios
      .get(`${postCommentDetails}${postId}/comments`)
      .then(res => setCommentDetails(res.data))
      .finally(e => setLoading(false));
  };

  return (
    <View style={styles.card} key={index}>
      <Text style={styles.id}>{`id- ${id}`}</Text>
      <Text style={styles.userId}>{`userId- ${userId}`}</Text>
      <Text style={styles.title}>{`title- ${title}`}</Text>
      <Text style={styles.body}>{`body- ${body}`}</Text>
      <TouchableOpacity
        style={[
          styles.btn,
          {
            backgroundColor: commentDetails.length > 0 ? 'gray' : 'green',
            opacity: commentDetails.length > 0 ? 0.5 : 1,
          },
        ]}
        disabled={commentDetails.length > 0}
        onPress={() => getComments(id)}>
        <Text
          style={[
            styles.btntext,
            {
              color: commentDetails.length > 0 ? '#FEFEFE' : '#ffffff',
              fontWeight: commentDetails.length > 0 ? 'bold' : 'normal',
            },
          ]}>{`Get Comment`}</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <>
          {Array.isArray(commentDetails) && commentDetails.length > 0 && (
            <FlatList
              data={commentDetails}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({item, index}) => {
                const {body, email, id, name} = item;
                return (
                  <View style={styles.commentCard}>
                    <Text style={styles.id}>{`userid- ${id}`}</Text>
                    <Text style={styles.title}>{`name- ${name}`}</Text>
                    <Text style={styles.userId}>{`email- ${email}`}</Text>
                    <Text style={styles.body}>{`body- ${body}`}</Text>
                  </View>
                );
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default memo(ListCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FEFEFE',
    margin: 16,
    padding: 16,
  },
  commentCard: {
    backgroundColor: 'lightblue',
    margin: 16,
    padding: 16,
  },
  id: {
    fontSize: 13,
    color: '#000',
  },
  userId: {
    fontSize: 14,
    color: '#000',
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  body: {
    fontSize: 18,
    color: 'gray',
  },
  btn: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 16,
    alignItems: 'center',
    borderRadius: 10,
  },
  btntext: {
    fontSize: 18,
    color: '#fff',
  },
  loader: {
    margin: 20,
    color: '#000',
  },
});
