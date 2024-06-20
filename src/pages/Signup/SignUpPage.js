import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignupPage() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordVerify, setPasswordVerify] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');

    const navigation = useNavigation();

    const goToSignup = () => {
        fetch('http://192.168.56.1:8080/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                name: name,
                phone: phone,
                address: address,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Signup 성공:', data);
            Alert.alert('Signup 성공', '회원가입에 성공했습니다.');
            navigation.navigate('LoginPage');
        })
        .catch((error) => {
            console.error('Signup 오류:', error);
            Alert.alert('Signup 오류', '회원가입 중 오류가 발생했습니다.', error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up Page</Text>
            <TextInput
                name="username"
                placeholder="아이디"
                value={username}
                onChangeText={setUsername}
                textAlign='center'
                style={styles.textInput}
            />
            <TextInput
                name="password"
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                textAlign='center'
                style={styles.textInput}
                secureTextEntry
            />
            <TextInput
                name="passwordVerify"
                placeholder="비밀번호 확인"
                value={passwordVerify}
                onChangeText={setPasswordVerify}
                textAlign='center'
                style={styles.textInput}
                secureTextEntry
            />
            <TextInput
                name="email"
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
                textAlign='center'
                style={styles.textInput}
            />
            <TextInput
                name="name"
                placeholder="이름"
                value={name}
                onChangeText={setName}
                textAlign='center'
                style={styles.textInput}
            />
            <TextInput
                name="phone"
                placeholder="핸드폰"
                value={phone}
                onChangeText={setPhone}
                textAlign='center'
                style={styles.textInput}
            />
            <TextInput
                name="address"
                placeholder="주소"
                value={address}
                onChangeText={setAddress}
                textAlign='center'
                style={styles.textInput}
            />
            <TouchableOpacity style={styles.button} onPress={goToSignup}>
                <Text style={styles.buttonText}>Signup</Text>
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
    textInput: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#49C8FF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 5,
        width: 200,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#25A4FF'
    },
});

export default SignupPage;