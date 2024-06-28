import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from '../pages/Main/MainPage';
import TodolistDetail from '../pages/Todolist/TodolistDetail';
import TodolistCreate from '../pages/Todolist/TodolistCreate';

const Stack = createNativeStackNavigator();

function MainNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
            <Stack.Screen name="TodolistDetail" component={TodolistDetail} />
            <Stack.Screen name="TodolistCreate" component={TodolistCreate} />
        </Stack.Navigator>
    );
}

export default MainNavigator;