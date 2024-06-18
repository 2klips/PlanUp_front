import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

function LoginPage({ navigation }) {
    const { setIsLoggedIn } = useAuth();

    const goToMain = () => {
        console.log('Go to Main button pressed');
        navigation.navigate('MainPage');
    };

    const goToSignup = () => {
        console.log('Go to SignupPage button pressed');
        navigation.navigate('SignupPage');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Page</Text>
            <TextInput
                placeholder="Username"
                textAlign='center'
                style={styles.textInput}
            />
            <TextInput
                placeholder="Password"
                textAlign='center'
                style={styles.textInput}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={goToMain}>
                <Text style={styles.buttonText}>Go to Main</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={goToSignup}>
                <Text style={styles.buttonText}>Go to SignupPage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setIsLoggedIn(true)}>
                <Text style={styles.buttonText}>Login</Text>
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

export default LoginPage;