// components/ui/Todolist.js

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const todoList = [
  { title: '정보처리기능사 필기', date: '2024년 07월 21일', daysLeft: 28, color: 'blue' },
  { title: '사용자 지정 메모', date: '2024년 08월 02일', daysLeft: 45, color: 'purple' },
  { title: '빅데이터분석기사', date: '2025년 03월 21일', daysLeft: 228, color: 'green' },
];

const TodoItem = ({ title, date, daysLeft, color }) => (
  <View style={styles.item}>
    <View style={styles.itemLeft}>
      <View style={[styles.circle, { backgroundColor: color }]} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
    <Text style={styles.daysLeft}>D-{daysLeft}일</Text>
  </View>
);

const Todolist = () => {
  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My TODO List</Text>
        <Text style={styles.subHeader}>모든 일정 | {todoList.length}</Text>
      </View>
      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <TodoItem
            title={item.title}
            date={item.date}
            daysLeft={item.daysLeft}
            color={item.color}
          />
        )}
        // keyExtractor={item => item.id}
      />
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
  },
  headerContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // justifyContent: 'flex-start', // 텍스트들을 왼쪽으로 정렬
    marginBottom: 10,  // 간격 조정
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,  
    color: '#06A4FD'
  },
  subHeader: {
    fontSize: 14,
    color: '#888',
    marginBottom: 7,
    marginLeft: 3,
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
  },
});

export default Todolist;