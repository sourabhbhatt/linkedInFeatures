import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import useProfileDetails from '../Hooks/useProfileDetails';

const UserProFileInfo = () => {
  // ✅ Store initial state in a component state to trigger re-renders
  const [profileDetails, setProfileDetails] = useState({
    name: 'Sourabh',
    age: '28',
  });

  // ✅ Call the custom hook inside the component
  const {handleSubmit, name, age, handleName, handleAge} =
    useProfileDetails(profileDetails);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={handleName} // ✅ State updates properly
      />
      <TextInput
        style={styles.textInput}
        value={age}
        onChangeText={handleAge} // ✅ State updates properly
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProFileInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    width: '80%',
  },
  btn: {
    backgroundColor: 'lightblue',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
});
