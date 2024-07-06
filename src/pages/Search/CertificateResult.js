// CertificateResult.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import B1 from '../../assets/images/emblemB1.png';

const CertificateResult = ({ route }) => {
  const { certificates } = route.params;
  const [jobName, setJobName] = useState('');
  const navigation = useNavigation();

  const calculateDDay = (examDate) => {
    if (!examDate) return 'N/A';
    const currentDate = new Date();
    const examDateObj = new Date(`${examDate.slice(0, 4)}-${examDate.slice(4, 6)}-${examDate.slice(6, 8)}`);
    const diffTime = examDateObj - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSearch = async () => {
    try {
      console.log(`Searching for job name: ${jobName}`);
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://10.0.2.2:8080/certifi/job_name', 
        { job_name: jobName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Certificates fetched successfully:', response.data);
      if (response.data.length === 0) {
        navigation.navigate('CertificateNo');
      } else {
        navigation.navigate('CertificateResult', { certificates: response.data });
      }
    } catch (error) {
      console.error('Failed to fetch certificates', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.job_name}</Text>
      {item.schedules.map((schedule, index) => {
        const 필기시험년도 = schedule.필기시험_시작일자.slice(0, 4);
        const 실기시험년도 = schedule.실기시험_시작일자.slice(0, 4);
        schedule.dDay필기 = calculateDDay(schedule.필기시험_시작일자);
        schedule.dDay실기 = calculateDDay(schedule.실기시험_시작일자);
        
        return (
          <View key={index} style={styles.scheduleContainer}>
            <View style={styles.examBox_1}>
              <Text style={styles.examTitle}>{필기시험년도}년 {item.job_name} {index + 1}회 필기</Text>
              <Text style={styles.scheduleText}>원서접수: {schedule.필기시험원서접수_시작일자} ~ {schedule.필기시험원서접수_종료일자}</Text>
              <Text style={styles.scheduleText}>합격 발표: {schedule.필기시험_합격_발표일자}</Text>
              <Text style={styles.dDay}>D-{schedule.dDay필기}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.examBox_2}>
              <Text style={styles.examTitle}>{실기시험년도}년 {item.job_name} {index + 1}회 실기</Text>
              <Text style={styles.scheduleText}>원서접수: {schedule.실기시험원서접수_시작일자} ~ {schedule.실기시험원서접수_종료일자}</Text>
              <Text style={styles.scheduleText}>합격 발표: {schedule.합격자발표시작일자}</Text>
              <Text style={styles.dDay}>D-{schedule.dDay실기}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={B1} style={styles.headerIcon} />
        <Text style={styles.headerText}>자격증시험추가</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="자격증의 이름을 입력하세요."
          value={jobName}
          onChangeText={setJobName}
          
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>검색하기</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.resultCount}>총 {certificates.length}개의 시험 일정이 검색되었어요.</Text>
      <FlatList
        data={certificates}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>※ 검색이 되지 않은 자격증은 자유 일정으로 추가해주세요.</Text>
        <Text style={styles.footerText}>※ 시험이 종료된 시험 일정은 검색되지 않아요.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#47BDFF',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    placeholderTextColor:"#69C9FF"
  },

  button: {
    backgroundColor: '#47BDFF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scheduleContainer: {
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  examBox_1: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
    borderColor: '#06A4FD',
    borderWidth: 2,
    shadowColor: '#000', // shadow color
    shadowOffset: { width: 0, height: 2 }, // shadow offset
    shadowOpacity: 0.2, // shadow opacity
    shadowRadius: 2, // shadow radius
    elevation: 3, // elevation for Android shadow
},
examBox_2: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
    borderColor: '#97E5FF',
    borderWidth: 2,
    shadowColor: '#000', // shadow color
    shadowOffset: { width: 0, height: 2 }, // shadow offset
    shadowOpacity: 0.2, // shadow opacity
    shadowRadius: 2, // shadow radius
    elevation: 3, // elevation for Android shadow
},
  examTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  scheduleText: {
    fontSize: 14,
    marginBottom: 5,
  },
  dDay: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#47BDFF',
    borderRadius: 3,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultCount: {
    fontSize: 16,
    color: "#47BDFF",
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#47BDFF',
    textAlign: 'center',
  },
});

export default CertificateResult;
