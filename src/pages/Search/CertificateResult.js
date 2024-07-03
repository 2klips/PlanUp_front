// CertificateResult.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const CertificateResult = ({ route }) => {
  const { certificates } = route.params;

  console.log('Certificates data received: 데이터 잘 받았는데.. 왜 안떠ㅠㅠㅠㅠㅠㅠ', certificates);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.job_name}</Text>
      {item.schedules.map((schedule, index) => (
        <View key={index} style={styles.scheduleContainer}>
          <Text style={styles.scheduleText}></Text>
          <Text style={styles.scheduleText}>필기시험: {schedule.필기시험시작일자} ~ {schedule.필기시험종료일자}</Text>
          <Text style={styles.scheduleText}>실기시험: {schedule.실기시험시작일자} ~ {schedule.실기시험종료일자}</Text>
          <Text style={styles.scheduleText}>합격 발표: {schedule.합격자발표시작일자}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={certificates}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  },
  scheduleText: {
    fontSize: 14,
  },
});

export default CertificateResult;




