import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    const { isLoggedIn } = useAuth();

    return (
        <Stack.Navigator>
            {isLoggedIn ? (
                <Stack.Screen name="MainPage" component={MainNavigator} options={{ headerShown: false }} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>
    );
}

export default AppNavigator;