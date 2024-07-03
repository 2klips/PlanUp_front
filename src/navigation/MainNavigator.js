import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from '../pages/Main/MainPage';
import TodolistCreate from '../pages/Todolist/TodolistCreate';
import SearchCertificate from '../pages/Search/SearchCertificate';
import CertificateResult from '../pages/Search/CertificateResult';

const Stack = createNativeStackNavigator();

function MainNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
            <Stack.Screen name="TodolistCreate" component={TodolistCreate} />
            <Stack.Screen name="SearchCertificate" component={SearchCertificate} />
            <Stack.Screen name="CertificateResult" component={CertificateResult} />
        </Stack.Navigator>
    );
}

export default MainNavigator;