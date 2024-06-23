import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import LoginInputBox from '../../components/ui/LoginInputBox';

function SignupPage() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordVerify, setPasswordVerify] = React.useState('');

    const navigation = useNavigation();

    const goToNextPage = () => {
        if (username === '') {
            Alert.alert('아이디를 입력해주세요.');
            return;
        }
        if (password === '') {
            Alert.alert('비밀번호를 입력해주세요.');
            return;
        }
        if (password !== passwordVerify) {
            Alert.alert('비밀번호 오류', '비밀번호가 일치하지 않습니다.');
            return;
        }

        navigation.navigate('SignupPage2', {
            username,
            password,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.TextBox}>
                <Text style={styles.title}>환영합니다!</Text>
                <Text style={styles.smallText}>원하시는 꿈을 이루실 수 있도록 최선을 다 할게요.</Text>
            </View>
            <View style={styles.TextBox}>
                <Text style={styles.subText}>사용하실 아이디와</Text>
                <Text style={styles.subText}>비밀번호를 비력해주세요.</Text>
            </View>
            <View style={styles.margin}>
            <LoginInputBox
                title="아이디"
                text="가입하실 아이디를 입력하세요"
                value={username}
                onChangeText={setUsername}
            />
            </View>
            <LoginInputBox
                title="비밀번호"
                text="비밀번호를 입력하세요"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                
            />
            <LoginInputBox
                title="비밀번호 확인"
                text="비밀번호를 다시 한 번 입력해주세요"
                value={passwordVerify}
                onChangeText={setPasswordVerify}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={goToNextPage}>
                <Text style={styles.buttonText}>다음</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#06A4FD',
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 12,
        marginBottom: 5,
        width: 100,
        height: 35,
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    smallText: {
        fontSize: 14,
        color: 'gray',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    margin: {
        marginBottom: 20,
    },
    subText: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    TextBox: {
        marginBottom: 20,
        marginLeft: 100,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
});

export default SignupPage;