import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';

const COLORS = ['#06A4FD', '#97E5FF', '#FF0000', '#FF81EB', '#FF8E25', '#FFE871', '#70FF4D', '#35F2DC', '#48B704', '#8206FD'];

const TodolistCreate = ({ route, navigation }) => {
  const { selectedDate } = route.params;
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [todoList, setTodoList] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [checklistItem, setChecklistItem] = useState('');
  const [isAddingChecklist, setIsAddingChecklist] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://192.168.9.25:8080/list', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2U1YjBkMjc4ZDE4NmJhNmU0MjFlMSIsImlhdCI6MTcxOTc5NDkyMiwiZXhwIjoxNzE5OTY3NzIyfQ.PjYrju1An1Jbwmyg6Oh3LoHchk5s-8MWZNgQiF-8mOg`
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
        userid: 'apple1',
        title: title,
        text: text,
        color: color,
        examDate: selectedDate,
        checklist: checklist,
      },{
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2U1YjBkMjc4ZDE4NmJhNmU0MjFlMSIsImlhdCI6MTcxOTc5NDkyMiwiZXhwIjoxNzE5OTY3NzIyfQ.PjYrju1An1Jbwmyg6Oh3LoHchk5s-8MWZNgQiF-8mOg`
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

  const handleAddChecklistItem = () => {
    setIsAddingChecklist(true);
  };

  const handleSaveChecklistItem = async () => {
    if (checklistItem.trim() !== '') {
      const newChecklistItem = { text: checklistItem, completed: false };
      try {
        const response = await axios.post('http://192.168.9.25:8080/list/check', {
          userid: 'apple1', 
          color: color, 
          examDate: selectedDate,
          list: checklistItem, 
          completed: false, 
          todoId: 'TODO_ID_HERE' 
        }, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2U1YjBkMjc4ZDE4NmJhNmU0MjFlMSIsImlhdCI6MTcxOTc5NDkyMiwiZXhwIjoxNzE5OTY3NzIyfQ.PjYrju1An1Jbwmyg6Oh3LoHchk5s-8MWZNgQiF-8mOg`
          }
        });
        if (response.status === 201) {
          setChecklist([...checklist, newChecklistItem]);
          setChecklistItem('');
          setIsAddingChecklist(false);
        } else {
          Alert.alert('Error', 'Failed to add checklist item');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred while adding the checklist item');
      }
    }
  };

  const handleToggleChecklistItem = (index) => {
    const newChecklist = [...checklist];
    newChecklist[index].completed = !newChecklist[index].completed;
    setChecklist(newChecklist);
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
    <ScrollView>
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          current={selectedDate}
          onDayPress={(day) => console.log('selected day', day)}
          markedDates={markedDates}
          monthFormat={'yyyy년 MM월'}
        />
        <View style={styles.colorPicker}>
          {COLORS.map((c, index) => (
            <TouchableOpacity key={index} onPress={() => setColor(c)} style={[styles.colorCircle, { backgroundColor: c, borderColor: color === c ? 'black' : 'transparent' }]} />
          ))}
        </View>
        <View style={styles.eventDetail}>
          <View style={[styles.circle, { backgroundColor: color }]} />
          <Text style={styles.eventDate}>
            {moment(selectedDate).locale('ko').format('YYYY년 M월 D일')}
            <Text style={styles.checklistCount}> ({checklist.length})</Text>
          </Text>
          <Text style={styles.text1}>제목</Text>
          <TextInput
            style={styles.input}
            placeholder="제목을 입력하세요"
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.text1}>상세내용</Text> 
          <TextInput
            style={styles.input}
            placeholder="상세내용을 입력하세요"
            value={text}
            onChangeText={setText}
            multiline
          />
          <View style={styles.checklistContainer}>
            <Text style={styles.text2}>Check List</Text>
            <TouchableOpacity style={styles.addButton1} onPress={handleAddChecklistItem}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          {isAddingChecklist && (
            <View style={styles.addChecklistContainer}>
              <TextInput
                style={styles.input}
                placeholder="체크리스트 항목 입력"
                value={checklistItem}
                onChangeText={setChecklistItem}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveChecklistItem}>
                <Text style={styles.saveButtonText}>저장</Text>
              </TouchableOpacity>
            </View>
          )}
          <FlatList
            data={checklist}
            renderItem={({ item, index }) => (
              <View style={styles.checklistItemContainer}>
                <Text style={[styles.checklistItem, item.completed && styles.checklistItemCompleted]}>{item.text}</Text>
                <CheckBox
                  value={item.completed}
                  onValueChange={() => handleToggleChecklistItem(index)}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        <View style={styles.style1}>
          <Text style={styles.text3}>일정추가하기</Text>
          <TouchableOpacity style={styles.addButton2} onPress={handleSave}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
  checklistCount: {
    fontSize: 14,
    color: 'gray',
  },
  text1: {
    color: '#C8C8C8',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#C8C8C8',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checklistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addChecklistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checklistItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  checklistItem: {
    fontSize: 16,
  },
  checklistItemCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  text2: {
    color: '#06A4FD',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  addButton1: {
    backgroundColor: '#06A4FD',
    // padding: 10,
    height: 25,
    width: 25,
    borderRadius: 3,
    alignItems: 'center',
  },
  text3: {
    color: '#06A4FD',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  style1:{
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"center"
  },
  addButton2: {
  backgroundColor: '#06A4FD',
  // padding: 5,
  width: 25,
  height: 25,
  borderRadius: 20,
  alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#06A4FD',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TodolistCreate;