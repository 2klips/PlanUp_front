// TodolistCreate.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';

const COLORS = ['#06A4FD', '#97E5FF', '#FF0000', '#FF81EB', '#FF8E25', '#FFE871', '#70FF4D', '#35F2DC', '#48B704', '#8206FD'];

const TodolistCreate = ({ route, navigation }) => {
  const { selectedDate } = route.params;
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState(COLORS[0]); // 기본 색상 설정
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://192.168.9.25:8080/list', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2U1YjBkMjc4ZDE4NmJhNmU0MjFlMSIsImlhdCI6MTcxOTU1NzcwMSwiZXhwIjoxNzE5NzMwNTAxfQ.AU9bisRo2ybqJ0SdMAFWOI_ehkg2MCU8Z9S2rCGzrr8`
          }
        });
        setTodoList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  const handleSave = async () => {
    if (title.trim() === '' || text.trim() === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('http://192.168.9.25:8080/list', {
        userid: 'apple',
        title: title,
        text: text,
        color: color,
        examDate: selectedDate,
      },{
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2U1YjBkMjc4ZDE4NmJhNmU0MjFlMSIsImlhdCI6MTcxOTU1NzI0NywiZXhwIjoxNzE5NzMwMDQ3fQ.7s2lGLnKXHWSrw3ToUBnW6U9wwofghfp7zYdm_qH2ww`
        }
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Todo added successfully');
        navigation.navigate('TodolistDetail');
      } else {
        Alert.alert('Error', 'Failed to add todo');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding the todo');
    }
  };

  const markedDates = {};
  todoList.forEach(item => {
    markedDates[item.examDate] = {
      marked: true,
      dotColor: item.color || 'red',
    };
  });

  markedDates[selectedDate] = { selected: true, selectedColor: 'blue' };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        current={selectedDate}
        onDayPress={(day) => console.log('selected day', day)}
        markedDates={markedDates}
        monthFormat={'yyyy년 MM월'}
        theme={{
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          monthTextColor: '#000',
          arrowColor: 'orange',
          textMonthFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
      <View style={styles.colorPicker}>
        {COLORS.map((c, index) => (
          <TouchableOpacity key={index} onPress={() => setColor(c)} style={[styles.colorCircle, { backgroundColor: c, borderColor: color === c ? 'black' : 'transparent' }]} />
        ))}
      </View>
      <View style={styles.eventDetail}>
        <View style={[styles.circle, { backgroundColor: color }]} />
        <Text style={styles.eventDate}>{moment(selectedDate).locale('ko').format('YYYY년 M월 D일')}</Text>
        <TextInput
          style={styles.input}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="상세내용"
          value={text}
          onChangeText={setText}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleSave}>
        <Text style={styles.addButtonText}>일정추가하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  calendar: {
    marginBottom: 16,
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
  },
  eventDetail: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 16,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TodolistCreate;
