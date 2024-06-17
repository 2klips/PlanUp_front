import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LoginPage() {
    const navigation = useNavigation();

    const goToMain = () => {
        console.log('Go to Main button pressed');
        navigation.navigate('MainPage');
    };

    const goToSignup = () => {
        console.log('Go to SignupPage button pressed');
        navigation.navigate('SignupPage');
    };

    return (
        <View>
            <Button title="Go to Main" onPress={goToMain} />
            <Button title="Go to SignupPage" onPress={goToSignup} />
            <Button title="Login" onPress={() => console.log('Login button pressed')} />
        </View>
    );
}

export default LoginPage;