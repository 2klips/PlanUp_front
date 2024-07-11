// Reminder.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Reminder = () => {
    const [nextTodo, setNextTodo] = useState(null);
    const [sameDayCount, setSameDayCount] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchTodos = async () => {
            const token = await AsyncStorage.getItem('token');
            try {
                const response = await axios.get('http://10.0.2.2:8080/list/userid', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const sortedTodoList = response.data.map(item => ({
                    ...item,
                    daysLeft: moment(item.examDate).diff(moment(), 'days')
                })).sort((a, b) => a.daysLeft - b.daysLeft);

                if (sortedTodoList.length > 0) {
                    const nearestTodo = sortedTodoList[0];
                    const nearestDate = moment(nearestTodo.examDate).format('YYYY-MM-DD');
                    const sameDayTodos = sortedTodoList.filter(item => moment(item.examDate).format('YYYY-MM-DD') === nearestDate);
                    
                    setNextTodo(nearestTodo);
                    setSameDayCount(sameDayTodos.length);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchTodos();
    }, []);

    if (!nextTodo) {
        return (
            <View style={styles.container}>
                <Text style={styles.noTodoText}>No upcoming todo items</Text>
            </View>
        );
    }

    const examDate = moment(nextTodo.examDate).format('YYYY-MM-D');
    const daysLeft = nextTodo.daysLeft;

    return (
        <TouchableOpacity onPress={() => navigation.navigate('TodolistDetail', { selectedTodo: nextTodo })}>
            <View style={[styles.container, { borderColor: nextTodo.color || 'blue' }]}>
                <View style={styles.itemLeft}>
                    <View>
                        {sameDayCount > 1 && (
                            <Text style={styles.sameDayCountText}>같은 D-Day 일정이 {sameDayCount}개 있어요.</Text>
                        )}
                        <Text style={styles.title}>{nextTodo.title}</Text>
                        <Text style={styles.examDate}>{examDate}</Text>
                        
                   
                    </View>
                </View>
                <Text style={styles.daysLeft}>D-{daysLeft}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderWidth: 3,
        borderRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        margin: 10,
        height: 80,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 6,
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'NanumSquareEB',
        marginRight: 10,
        marginTop: 0,
    },
    examDate: {
        fontSize: 10,
        fontFamily: 'NanumSquareB',
        color: 'black',
        marginTop: 0,
    },
    sameDayCountText: {
        fontSize: 12,
        color: '#06A4FD', 
        fontFamily: 'NanumSquareEB',
    },
    daysLeft: {
        fontSize: 30,
        fontWeight: '700',
        color: '#06A4FD',
    },
    noTodoText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
    },
});

export default Reminder;