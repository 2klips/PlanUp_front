import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox'; 
import axios from 'axios';
import moment from 'moment';

const ChecklistItem = ({ title, date, color, isChecked, onValueChange }) => (
  <View style={styles.item}>
    <View style={styles.itemLeft}>
      <View style={[styles.circle, { backgroundColor: color || 'blue' }]} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}까지</Text>
      </View>
    </View>
    <CheckBox value={isChecked} onValueChange={onValueChange} /> 
  </View>
);

const Checklist = ({ navigation }) => {
  const [checklist, setChecklist] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await axios.get('http://192.168.9.25:8080/list/check', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2U1YjBkMjc4ZDE4NmJhNmU0MjFlMSIsImlhdCI6MTcxOTc5NDkyMiwiZXhwIjoxNzE5OTY3NzIyfQ.PjYrju1An1Jbwmyg6Oh3LoHchk5s-8MWZNgQiF-8mOg`
          }
        });
        const checklistItems = response.data
          .map(item => ({
            id: item._id,
            title: item.list,
            date: moment(item.examDate).format('YYYY년 M월 D일'),
            color: item.color,
            isChecked: item.completed, // Assuming `completed` is the correct property
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setChecklist(checklistItems);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChecklist();
  }, []);

  // const handleCheckboxChange = (id, value) => {
  //   setChecklist(prevChecklist =>
  //     prevChecklist.map(item =>
  //       item.id === id ? { ...item, isChecked: value } : item
  //     )
  //   );
  // };

  const handleToggleCheckbox = async (id, newValue) => {
    try {
      await axios.get(`http://192.168.9.25:8080/list/check/`, {
        completed: newValue,
      }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2U1YjBkMjc4ZDE4NmJhNmU0MjFlMSIsImlhdCI6MTcxOTc5NDkyMiwiZXhwIjoxNzE5OTY3NzIyfQ.PjYrju1An1Jbwmyg6Oh3LoHchk5s-8MWZNgQiF-8mOg`
        }
      });
      setChecklist(prevChecklist =>
        prevChecklist.map(item =>
          item.id === id ? { ...item, isChecked: newValue } : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Check list</Text>
      <FlatList
        data={showMore ? checklist : checklist.slice(0, visibleItems)}
        renderItem={({ item }) => (
          <ChecklistItem
            title={item.title}
            date={item.date}
            color={item.color}
            isChecked={item.isChecked}
            onValueChange={(value) => handleToggleCheckbox(item.id, value)}
          />
        )}
        keyExtractor={item => item.id}
      />
      {!showMore && checklist.length > visibleItems && (
        <TouchableOpacity style={styles.showMoreButton} onPress={handleShowMore}>
          <Text style={styles.showMoreText}>더보기</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.footer}>※ 완료된 체크리스트는 자동으로 사라져요.</Text>
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
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#06A4FD',
    marginBottom: 10,
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
  showMoreButton: {
    padding: 10,
    alignItems: 'center',
  },
  showMoreText: {
    color: '#06A4FD',
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Checklist;
