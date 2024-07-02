// export default URLOnly;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const URLOnly = ({ navigation }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('SearchMain')}>
            <View style={styles.card}>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JobPostCreate')}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.addposting}>취업공고 추가</Text>
                    <Text style={styles.title}>취업공고 URL을 입력해주세요!</Text>
                    <Text style={styles.description}>취업 공고 일정을 캘린더에 추가할 수 있어요.</Text>
                    <View style={styles.logoContainer}>
                        {/* <Image source={require('./assets/saramin.png')} style={styles.logo} />
                        <Image source={require('./assets/jobkorea.png')} style={styles.logo} />
                        <Image source={require('./assets/wanted.png')} style={styles.logo} />
                        <Image source={require('./assets/worknet.png')} style={styles.logo} />
                        <Image source={require('./assets/jobplanet.png')} style={styles.logo} /> */}
                    </View>
                </View>
                <View style={styles.separator} />
                <View style={styles.section}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExamScheduleCreate')}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.addposting}>자격증 시험 추가</Text>
                    <Text style={styles.title}>시험일정을 검색해보세요!</Text>
                    <Text style={styles.description}>자격증 시험 일정을 캘린더에 등록할 수 있어요.</Text>
                    <Text style={styles.note}>※ 검색이 되지 않는 자격증은 자주 일정으로 추가해주세요.</Text>
                    {/* <Image source={require('./assets/hrdk.png')} style={styles.hrLogo} /> */}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    section: {
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        // flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: '#06A4FD',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },
    addposting: {
        color: '#06A4FD',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    logo: {
        width: 80,
        height: 30,
        margin: 5,
        resizeMode: 'contain',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        width: '100%',
        marginVertical: 20,
    },
    note: {
        fontSize: 12,
        color: '#06A4FD',
        textAlign: 'center',
        marginBottom: 10,
    },
    hrLogo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
});

export default URLOnly;

