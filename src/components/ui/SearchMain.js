import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SearchMain = () => {
  const [jobUrl, setJobUrl] = useState('');
  const [certName, setCertName] = useState('');

  const handleJobCheck = () => {
    console.log(`Job URL to check: ${jobUrl}`);
  };

  const handleCertCheck = () => {
    console.log(`Certification name to check: ${certName}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        {/* <Text style={styles.headerText}>취업 공고 페이지의 URL 주소를 입력하세요.</Text> */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={jobUrl}
            onChangeText={setJobUrl}
            placeholder="취업 공고 페이지의 URL 주소를 입력하세요."
          />
          <TouchableOpacity style={styles.copyButton}>
            <Text style={styles.copyButtonText}>검색</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>취업 공고 추가</Text>
          <Text style={styles.footerSubText}>구직 사이트에서 찾으신 구직공고 페이지의 URL주소를 입력해주세요!</Text>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/images/Group72.png')} style={styles.logo} />
          </View>
          <Text style={styles.note}>※ 위 업체들의 공고만 먼저 지원해드리고 있어요.</Text>
        </View>
      </View>

      <View style={styles.section}>
        {/* <Text style={styles.headerText}>자격증 이름으로 검색</Text> */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={certName}
            onChangeText={setCertName}
            placeholder="자격증 이름으로 검색"
          />
          <TouchableOpacity style={styles.copyButton}>
            <Text style={styles.copyButtonText}>검색</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>자격증 시험 일정추가</Text>
          <Text style={styles.footerSubText}>자격증 시험 일정을 검색하셔서 일정에 추가하세요!</Text>
          <Image source={require('../../assets/images/엠블럼B1.png')} style={styles.logo} />
          <Text style={styles.note}>※ 검색이 되지 않은 자격증은 개별 공고문으로 추가해주세요.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
  section: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  headerText: {
    fontSize: 16,
    color: '#4a4a4a',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#47BDFF',
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
  },
  copyButton: {
    backgroundColor: '#47BDFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  copyButtonText: {
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    color: '#black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footerSubText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  logo: {
    width: 250,
    height: 50,
    resizeMode: 'contain',
  },
  note: {
    fontSize: 12,
    color: '#47BDFF',
    textAlign: 'center',
  },
});

export default SearchMain;
