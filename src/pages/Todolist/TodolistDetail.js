import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Button, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const TodolistDetail = ({ navigation }) => {
    const todoList = [
        { title: '정보처리기능사 필기', date: '2024년 07월 21일', daysLeft: 28, color: 'blue' },
        { title: '사용자 지정 메모', date: '2024년 08월 02일', daysLeft: 45, color: 'purple' },
        { title: '빅데이터분석기사', date: '2025년 03월 21일', daysLeft: 228, color: 'green' },
        { title: 'AI KOREA 세미나', date: '2025년 02월 24일', daysLeft: 231, color: 'red' },
    ];

    const renderTodo = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={[styles.circle, { backgroundColor: item.color }]} />
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
            </View>
            <Text style={styles.daysLeft}>D-{item.daysLeft}일</Text>
        </View>
    );

    return (
        <ScrollView >
            <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Todo List</Text>
                <Button title="+" onPress={() => navigation.navigate('AddTodo')} />
            </View>
            <Text style={styles.subtitle}>자격증 시험 일정이나, 면접 일정들을 잊지 않게 미리 추가해주세요!</Text>
            <Calendar
                style={styles.calendar}
                current={'2024-07-01'}
                monthFormat={'yyyy MM'}
                onDayPress={(day) => console.log('selected day', day)}
            />
            <View style={styles.todoListHeader}>
                <Text style={styles.todoListTitle}>등록된 모든 일정 | {todoList.length}개</Text>
            </View>
            <FlatList
                data={todoList}
                renderItem={renderTodo}
                keyExtractor={(item, index) => index.toString()}
            />
            <Text style={styles.footerText}>일정이 지난 Todo list는 자동으로 삭제돼요.</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',  // 배경색을 흰색으로 설정
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
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
        color: '#06A4FD'
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
    date: {
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
});

export default TodolistDetail;

// npm install @expo/vector-icons
// npm install expo
// expo r -c
// npm install --save react-native-calendars
