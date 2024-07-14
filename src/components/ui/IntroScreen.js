import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../../assets/images/logo.svg';

function IntroScreen({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('MainPage');  
        }, 1400); // 3초 

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Logo width={100} height={100} style={styles.logo}/>
            <Text style={styles.App_name}>이름 아직도 못정함ㅋㅋ</Text>
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    App_name: {
        fontSize: 24,
        fontFamily: 'NanumSquareEB',
        color: 'black',
        marginBottom: 10,
    },
    logo: {
        marginBottom: 0,
    },
    
});

export default IntroScreen;
