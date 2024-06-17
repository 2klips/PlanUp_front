import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View, StyleSheet } from 'react-native';
import HorizontalLine from './HorizontalLine';

const Card = ({ title, text, num, style }) => {
    return (
      <LinearGradient colors={['#AAE6FF', '#49C8FF', '#25A4FF']} style={[styles.linearGradient, style]}>
        <View style={styles.card}>
          <View style={styles.textbox}>
            <Text style={styles.title}>{title}</Text>
            <HorizontalLine/>
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={styles.numbox}>
            <Text style={styles.num}>{num}</Text>
          </View>
        </View>
      </LinearGradient>
    );
  };

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    
},
linearGradient: {
    width: '100%',
    padding: 10,
},
card: {
    padding: 20,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row', // 가로 방향으로 요소를 배치하기 위해 추가
    alignItems: 'center', // 세로 중앙 정렬을 위해 추가
},
textbox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '60%',
    paddingRight: 10, // numbox와의 간격을 위해 추가
},
title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
},
text: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    textAlign: 'right',
},
num: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
    textAlign: 'right', // 숫자를 오른쪽으로 정렬하기 위해 추가

},
numbox: {
    flex: 0.5, // numbox가 차지하는 너비 비율을 조절
    alignItems: 'flex-end', // 숫자를 오른쪽으로 정렬하기 위해 추가
},

});

export default Card;