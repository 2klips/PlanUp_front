import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from '../pages/Main/MainPage';
import URLInputPage from '../pages/URLInputPage/URLInputPage';
import JobDetailsPage from '../pages/JobDetailsPage/JobDetailsPage';
import TodolistCreate from '../pages/Todolist/TodolistCreate';
import SearchCertificate from '../pages/Search/SearchCertificate';
import CertificateResult from '../pages/Search/CertificateResult';
import CertificateNo from '../pages/Search/CertificateNo';
import TodolistDetail from '../pages/Todolist/TodolistDetail';

const Stack = createNativeStackNavigator();

function MainNavigator() {
    return (
        <Stack.Navigator initialRouteName="MainPage">
            <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
            <Stack.Screen name="URLInputPage" component={URLInputPage} />
            <Stack.Screen name="JobDetailsPage" component={JobDetailsPage} />
            <Stack.Screen name="TodolistCreate" component={TodolistCreate} />
            <Stack.Screen name="TodolistDetail" component={TodolistDetail} />
            <Stack.Screen name="SearchCertificate" component={SearchCertificate} />
            <Stack.Screen name="CertificateResult" component={CertificateResult} />
            <Stack.Screen name="CertificateNo" component={CertificateNo} />
        </Stack.Navigator>
    );
}

export default MainNavigator;