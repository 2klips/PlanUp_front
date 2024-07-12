import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import VirtualizedView from '../../utils/VirutalizedList';
import CustomCalendar from '../../components/ui/CustomCalendar';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

const ChecklistItem = ({ title, date, color, completed, onValueChange }) => (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={[styles.circle, { backgroundColor: color || 'blue' }]} />
        <View>
          <Text style={[styles.title, completed && styles.checklistItemCompleted]}>{title}</Text>
          <Text style={[styles.date, completed && styles.checklistItemCompleted]}>{date}까지</Text>
        </View>
      </View>
      <CheckBox value={completed} onValueChange={onValueChange} /> 
    </View>
  );

  const toastConfig = {
    Error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: 'red' }}
        text1Style={{ fontSize: 17 }}
        text2Style={{ fontSize: 15 }}
        visibilityTime={3000}
      />
    )
  };


const COLORS = ['#06A4FD', '#97E5FF', '#FF0000', '#FF81EB', '#FF8E25', '#FFE871', '#70FF4D', '#35F2DC', '#48B704', '#8206FD'];

const TodolistDetail = ({ route, navigation }) => {
    const { selectedTodo } = route.params;
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [color, setColor] = useState(COLORS[0]);
    const [checklists, setChecklists] = useState([]);
    const [checklistItem, setChecklistItem] = useState('');
    const [isAddingChecklist, setIsAddingChecklist] = useState(false);
    const [isDeleting, setIsDeleting] = useState(true);
    const [todo, setTodo] = useState('');
    const [newChecklist, setNewChecklist] = useState([]);
    const marked = {};
    marked[selectedDate] = { selected: true, selectedColor: '#06A4FD' };

    useEffect(() => {
        setTitle(selectedTodo.title);
        setText(selectedTodo.text);
        setColor(selectedTodo.color);
        setTodo(selectedTodo._id);
        setSelectedDate(moment(selectedTodo.examDate).format('YYYY-MM-DD'));
        console.log(selectedTodo)
        setChecklistItem('')
        
        fetchChecklist();
    }, []);
    

    const fetchChecklist = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            const todoID = selectedTodo._id
            const response = await axios.post(
                'http://10.0.2.2:8080/checklist/getByTodoId',
                { todoId: todoID }, // 데이터 객체
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );
          const checklistItems = response.data
                .map(item => ({
                    id: item._id,
                    text: item.list,
                    date: moment(item.examDate).format('YYYY년 M월 D일'),
                    color: item.color,
                    completed: item.completed,
                }))
                .sort((a, b) => new Date(a.date) - new Date(b.date)); // 생성 날짜 오름차순 정렬

            // 완료된 항목은 배열의 끝으로 이동
            const sortedChecklist = [
                ...checklistItems.filter(item => !item.completed),
                ...checklistItems.filter(item => item.completed)
            ];

            setChecklists(sortedChecklist);
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.delete(`http://10.0.2.2:8080/list/delete/${selectedTodo._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                Alert.alert('성공', '일정 삭제 성공');
                navigation.navigate('MainPage');
            }
        } catch (error) {
            console.error(error);
        }
    }
    
  const showToast = () => {
    console.log('토스트 호출')
    Toast.show({
      type: 'Error',
      text1: '현재 읽기 전용 상태입니다.',
      text2: '수정을 원하시면 수정 버튼을 눌러주세요.',
      visibilityTime: 3000,
    });}  
  const handleSave = async () => {
    if (title.trim() === '' || text.trim() === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put('http://10.0.2.2:8080/list/update', {
        id: todo,
        title: title,
        text: text,
        color: color,
        examDate: selectedDate,
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        Alert.alert('성공', '일정 수정 성공');
        const todoId = response.data._id
        await saveChecklistItems(todoId);
        await updateExistingChecklistItems();
        setIsDeleting(true);
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

  const handleSaveChecklistItem = () => {
    if (checklistItem.trim() !== '') {
      const newChecklistItem = { date:moment(selectedDate).format('YYYY년 M월 D일'), color:color ,text: checklistItem, completed: false };
      setChecklists([...checklists, newChecklistItem]);
      setNewChecklist([...newChecklist, newChecklistItem]);
      setChecklistItem('');
      setIsAddingChecklist(false);
    }
  };

  const saveChecklistItems = async (todoId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      for (const item of newChecklist) {
        const response = await axios.post('http://10.0.2.2:8080/checklist', {
          userid: user.userid,
          color: color,
          examDate: selectedDate,
          list: item.text,
          completed: item.completed,
          todoId: todoId
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (response.status !== 201) {
          Alert.alert('Error', 'Failed to add checklist item');
          return;
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding the checklist item');
    }
  };


  const updateExistingChecklistItems = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      for (const item of checklists) {
        if (!newChecklist.includes(item)) { // 기존 체크리스트 항목만 업데이트
          const response = await axios.put('http://10.0.2.2:8080/checklist/update', {
            id: item.id,
            color: item.color,
            examDate: selectedDate,
            completed: item.completed,
            list: item.text
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.status !== 200) {
            Alert.alert('Error', 'Failed to update checklist item');
            return;
          }
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while updating the checklist item');
    }
  };

    const handleToggleCheckbox = async (id, newValue) => {
    try {
        const token = await AsyncStorage.getItem('token');
        await axios.put(
        `http://10.0.2.2:8080/checklist/updateCompleted`,
        { id,
            completed: newValue 
        },
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
        );
        
        setChecklists(prevChecklists =>
        prevChecklists.map(item =>
            item.id === id ? { ...item, completed: newValue } : item
        ).sort((a, b) => {
            if (a.completed === b.completed) {
            return new Date(a.date) - new Date(b.date);
            }
            return a.completed - b.completed;
        })
        );
    } catch (error) {
        console.error(error);
    }
    };

    const handleColorChange = (newColor) => {
      setColor(newColor);
      setChecklists(checklists.map(item => ({ ...item, color: newColor })));
    };
    
    const handleSelectDate = (date) => {
      setSelectedDate(date);
      const formattedDate = moment(date).format('YYYY년 M월 D일');
      setChecklists(prevChecklists => 
        prevChecklists.map(item => ({ ...item, date: formattedDate }))
      );
      setNewChecklist(prevNewChecklist => 
        prevNewChecklist.map(item => ({ ...item, date: formattedDate }))
      );
    }

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomCalendar
            style={styles.calendar}
            current={selectedDate}
            onDayPress={isDeleting ? showToast : (day) => handleSelectDate(day.dateString)}
            markingType={'multi-dot'}
            markedDates={marked}
            monthFormat={'yyyy년 MM월'}
        />
        <View style={styles.colorPicker}>
          {COLORS.map((c, index) => (
            <TouchableOpacity key={index} onPress={isDeleting ? showToast : () => handleColorChange(c)} style={[styles.colorCircle, { backgroundColor: c, borderColor: color === c ? 'black' : 'transparent' }]} />
          ))}
        </View>
        <View style={styles.eventDetail}>
          <View style={styles.dateContainer}>
            <Text style={styles.eventDate}>
                <View style={[styles.circle, { backgroundColor: color }]} />
                <Text>  </Text>
                {moment(selectedDate).locale('ko').format('YYYY년 M월 D일')}
                <Text style={styles.checklistCount}> ({checklists.length})</Text>
            </Text>
                <TouchableOpacity 
                    onPress={() => setIsDeleting(prev => !prev)}
                >
                    <Text style={styles.editButton}>수정</Text>
                </TouchableOpacity>
            </View>
          <Text style={styles.text1}>제목</Text>
          <TextInput
            style={styles.inputTitle}
            placeholder="제목을 입력하세요"
            value={title}
            onChangeText={setTitle}
            editable={!isDeleting}
          />
          <Text style={styles.text1}>상세내용</Text> 
          <TextInput
            style={styles.input}
            placeholder="상세내용을 입력하세요"
            value={text}
            onChangeText={setText}
            multiline
            editable={!isDeleting}
          />
          <View style={styles.checklistContainer}>
            <Text style={styles.text2}>Check List</Text>
            <TouchableOpacity 
            style={[isDeleting ? styles.disabledAddButton1 : styles.addButton1]} 
            onPress={isDeleting ? showToast : handleAddChecklistItem}
            >
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
            data={checklists}
            renderItem={({ item }) => (
                <ChecklistItem
                title={item.text}
                date={item.date}
                color={item.color}
                completed={item.completed}
                onValueChange={(value) => handleToggleCheckbox(item.id, value)}
            />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
            <View>    
                {isDeleting ? (
                    <View style={styles.style1}>
                    <Text style={styles.deltext}>일정삭제하기</Text>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.addButtonText}>-</Text>
                    </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.style1}>
                    <Text style={styles.text3}>일정수정하기</Text>
                    <TouchableOpacity style={styles.addButton2} onPress={handleSave}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
      </View>
      <Toast config={toastConfig} />
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
    marginRight: 8,

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
    height: 'auto',
    borderColor: '#C8C8C8',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputTitle: {
    height: 40,
    borderColor: '#C8C8C8',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
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
  disabledAddButton1: {
    backgroundColor: 'gray',
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

  deltext: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    // padding: 5,
    width: 25,
    height: 25,
    borderRadius: 20,
    alignItems: 'center',
    },


    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },


    editButton: {
        backgroundColor: '#06A4FD',
        // position: 'absolute',
        // right: 0,
        // top: 0,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    },
    title: {
    fontSize: 16,
    fontWeight: 'bold',
    },
    date: {
    fontSize: 14,
    color: '#888',
    },
    checklistItemCompleted: {
        textDecorationLine: 'line-through',
        color: 'gray',
      },
    
});

export default TodolistDetail;