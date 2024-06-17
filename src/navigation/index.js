import React from 'react';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';


function AppNavigator() {
    const isLoggedIn = false;
    return (isLoggedIn ? <MainNavigator /> : <AuthNavigator />);
}

export default AppNavigator;