// TodolistnCalendar.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodolistCalendar = ({ navigation }) => {
    const [todoList, setTodoList] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchTodos = async () => {
            const token = await AsyncStorage.getItem('token');
            try {
                const response = await axios.get('http://10.0.2.2:8080/list', {
                    Authorization: `Bearer ${token}`
                });
                setTodoList(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTodos();
    }, []);

    const markedDates = {};
    todoList.forEach(item => {
        markedDates[moment(item.examDate).format('YYYY-MM-DD')] = {
            marked: true,
            dotColor: item.color || 'red',
        };
    });

    // markedDates 객체를 콘솔에 출력하여 디버깅
    console.log('markedDates:', markedDates);

    const renderTodo = ({ item }) => {
        const examDate = moment(item.examDate);
        const formattedDate = examDate.format('YYYY년 M월 D일');
        const daysLeft = examDate.diff(moment(), 'days');

        return (
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={[styles.circle, { backgroundColor: item.color || 'blue' }]} />
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.examDate}>{formattedDate}</Text>
                    </View>
                </View>
                <Text style={styles.daysLeft}>D-{daysLeft}일</Text>
            </View>
        );
    };

    const displayedTodoList = showAll ? todoList : todoList.slice(0, 4);

    return (
        <View style={styles.card}>
            <ScrollView>
                <View style={styles.container}>
                    <Calendar
                        style={styles.calendar}
                        current={'2024-07-01'}
                        monthFormat={'yyyy MM'}
                        onDayPress={(day) => navigation.navigate('TodolistCreate', { selectedDate: day.dateString })}
                        markedDates={markedDates}
                    />
                    <View style={styles.todoListHeader}>
                        <Text style={styles.todoListTitle}>등록된 모든 일정 | {todoList.length}개</Text>
                    </View>
                    <FlatList
                        data={displayedTodoList}
                        renderItem={renderTodo}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    {!showAll && todoList.length > 4 && (
                        <TouchableOpacity onPress={() => setShowAll(true)}>
                            <Text style={styles.moreText}>... 더보기</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.footerText}>일정이 지난 Todo list는 자동으로 삭제돼요.</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    calendar: {
        marginBottom: 20,
    },
    todoListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    todoListTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#06A4FD',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    examDate: {
        fontSize: 14,
        color: '#888',
    },
    daysLeft: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    footerText: {
        fontSize: 12,
        color: 'gray',
        marginTop: 10,
        textAlign: 'center',
    },
    moreText: {
        fontSize: 16,
        color: '#06A4FD',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default TodolistCalendar;