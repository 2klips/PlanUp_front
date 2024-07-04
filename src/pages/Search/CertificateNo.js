// CertificateNo.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CertificateNo = () => {
  const [jobName, setJobName] = useState('');
  const navigation = useNavigation();

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
        Alert.alert(
          "검색 결과 없음",
          "이름이 잘못되었거나, 시험 예정 일정이 없어요.민간자격증의 경우, 검색되지 않아요.",
          [{ text: "확인" }]
        );
      } else {
        navigation.navigate('CertificateResult', { certificates: response.data });
      }
    } catch (error) {
      console.error('Failed to fetch certificates', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/certificate.png' }} style={styles.headerIcon} />
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
      <View style={styles.resultContainer}>
        <Image source={require('../../assets/images/jobkorea_logo.png')} style={styles.notFoundIcon} />
        <Text style={styles.noResultText}>검색결과가 없어요.</Text>
        <Text style={styles.noResultDetailText}>이름이 잘못되었거나, 시험 예정 일정이 없어요.</Text>
        <Text style={styles.noResultDetailText}>민간자격증의 경우, 검색되지 않아요.</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>※ 현재 국가공인 자격증만 검색할 수 있어요.</Text>
        <Text style={styles.footerText}>검색에 되지 않는 자격증은 자격 일정으로 추가해주세요.</Text>
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
    alignItems: 'center',
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
  resultContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  notFoundIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  noResultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  noResultDetailText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#47BDFF',
    textAlign: 'center',
  },
});

export default CertificateNo;

