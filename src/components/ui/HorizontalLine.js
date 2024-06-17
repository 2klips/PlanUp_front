import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLine = () => {
    return (
    <View style={styles.line}></View>
    );
};

const styles = StyleSheet.create({
    line: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 10, // 수평선 위아래 여백 조정 (원하는 만큼)
    },
});

export default HorizontalLine;