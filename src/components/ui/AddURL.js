// AddURL.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddURL = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Ionicons name="card-outline" size={24} color="#00aaf0" style={styles.icon} />
        <Text style={styles.text}>자격증시험추가</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <Ionicons name="briefcase-outline" size={24} color="#00aaf0" style={styles.icon} />
        <Text style={styles.text}>취업공고추가</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View> 
  );
};

// AddURL.js
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // padding: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#00aaf0',
    marginRight: 8,
  },
  button: {
    backgroundColor: '#00aaf0',
    borderRadius: 2,
    // height: 18,
    // width: 18,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
});

export default AddURL;

