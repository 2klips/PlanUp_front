// TodolistDetail.js
// npm install axios
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import moment from 'moment';

const TodolistDetail = ({ navigation }) => {
    const [todoList, setTodoList] = useState([]);
    const [showAll, setShowAll] = useState(false);

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

    const markedDates = {};
    todoList.forEach(item => {
        markedDates[moment(item.examDate).format('YYYY-MM-DD')] = {
            marked: true,
            dotColor: item.color || 'red',
        };
    });

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

    const displayedTodoList = showAll ? todoList : todoList.slice(0, 6);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TextInput 
                        style={styles.searchBar} 
                        placeholder="공고 또는 자격증일정 검색" 
                    />
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('TodolistCreate', { selectedDate: new Date().toISOString().split('T')[0] })}>
                        <Text style={styles.addButtonText}>일정추가</Text>
                    </TouchableOpacity>
                </View>
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
                {!showAll && todoList.length > 6 && (
                    <TouchableOpacity onPress={() => setShowAll(true)}>
                        <Text style={styles.moreText}>... 더보기</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.footerText}>일정이 지난 Todo list는 자동으로 삭제돼요.</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchBar: {
        flex: 1,
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#06A4FD',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
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

export default TodolistDetail;
