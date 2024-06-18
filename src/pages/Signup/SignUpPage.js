import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

function SignupPage() {

    const goToSignup = () => {
        console.log('Signup button pressed');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up Page</Text>
            <TextInput
                placeholder="Username"
                textAlign='center'
                style={styles.textInput}
            />
            <TextInput
                placeholder="PassWord"
                textAlign='center'
                style={styles.textInput}
            />
            <TextInput
                placeholder="Password Confirmation"
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