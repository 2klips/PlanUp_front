// components/ui/Todolist.js

// import React from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';


// const TodoItem = ({ title, date, daysLeft, color }) => (
//   <View style={styles.item}>
//     <View style={styles.itemLeft}>
//       <View style={[styles.circle, { backgroundColor: color }]} />
//       <View>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.date}>{date}</Text>
//       </View>
//     </View>
//     <Text style={styles.daysLeft}>D-{daysLeft}일</Text>
//   </View>
// );

// const Todolist = () => {
//   return (
//     <View style={styles.card}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>My TODO List</Text>
//         <Text style={styles.subHeader}>모든 일정 | {todoList.length}</Text>
//       </View>
//       <FlatList
//         data={todoList}
//         renderItem={({ item }) => (
//           <TodoItem
//             title={item.title}
//             date={item.date}
//             daysLeft={item.daysLeft}
//             color={item.color}
//           />
//         )}
//         // keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     // justifyContent: 'space-between',
//     alignItems: 'center',
//     // justifyContent: 'flex-start', // 텍스트들을 왼쪽으로 정렬
//     marginBottom: 10,  // 간격 조정
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,  
//     color: '#06A4FD'
//   },
//   subHeader: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 7,
//     marginLeft: 3,
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   itemLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   circle: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   date: {
//     fontSize: 14,
//     color: '#888',
//   },
//   daysLeft: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default Todolist;


// components/ui/Todolist.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const TodoItem = ({ title, date, daysLeft, color }) => (
  <View style={styles.item}>
    <View style={styles.itemLeft}>
      <View style={[styles.circle, { backgroundColor: color || 'blue' }]} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
    <Text style={styles.daysLeft}>D-{daysLeft}일</Text>
  </View>
);

const Todolist = ({ navigation }) => {
  const [todoList, setTodoList] = useState([]);
  const [showAll, setShowAll] = useState(false);


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://192.168.9.25:8080/list', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2EzNTQxNjY1NzQxZDU4M2I1OGRhMyIsImlhdCI6MTcxOTU1MjE2OSwiZXhwIjoxNzE5NzI0OTY5fQ.OSh_xhiKmokV56i5QtUTIjDss_uKqQxSbg74yfLhDzQ`
          }
        });
        const todos = response.data.map(item => ({
          id: item._id,
          title: item.title,
          date: moment(item.examDate).format('YYYY년 M월 D일'),
          daysLeft: moment(item.examDate).diff(moment(), 'days'),
          color: item.color,
        }));
        setTodoList(todos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  const displayedTodoList = showAll ? todoList : todoList.slice(0, 4);

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My TODO List</Text>
        <View style={styles.headerRight}>
          <Text style={styles.subHeader}>모든 일정 | {todoList.length}</Text>
        </View>
      </View>
          <TouchableOpacity onPress={() => navigation.navigate('TodolistCreate', { selectedDate: new Date().toISOString().split('T')[0] })}>
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
      <FlatList
        data={displayedTodoList}
        renderItem={({ item }) => (
          <TodoItem
            title={item.title}
            date={item.date}
            daysLeft={item.daysLeft}
            color={item.color}
          />
        )}
        keyExtractor={item => item.id}
      />
      {!showAll && todoList.length > 4 && (
        <TouchableOpacity onPress={() => setShowAll(true)}>
          <Text style={styles.moreText}>... 더보기</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#06A4FD'
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: '#888',
    marginRight: 10,
    marginLeft: 10,
  },
  addButton: {
    fontSize: 24,
    // justifyContent: 'space-between',
    // alignItems: 'left',
    // float: 'right',
    position: 'absolute',
    right: 0,
    top: -38,
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
  date: {
    fontSize: 14,
    color: '#888',
  },
  daysLeft: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moreText: {
    fontSize: 16,
    color: '#06A4FD',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default Todolist;
