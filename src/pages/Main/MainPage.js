import React, { useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Card from '../../components/ui/Card';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import TodolistCalendar from '../../components/ui/TodolistCalendar';
import CalendarOnly from '../../components/ui/CalendarOnly';
import Checklist from '../../components/ui/Checklist';
import AddURL from '../../components/ui/AddURL';
import URLonly from '../../components/ui/URLonly';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VirtualizedView from '../../utils/VirutalizedList';
import Logo from '../../assets/images/logo.svg'

function MainPage() {
    const { user } = useAuth();
    const route = useRoute();
    const [isChecklist, setIsChecklist] = useState(false);
    const [isTodoList, setIsTodoList] = useState(false);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchChecklist = async () => {
            const token = await AsyncStorage.getItem('token');
            try {
                const response = await axios.get('http://10.0.2.2:8080/checklist/userid', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setIsChecklist(response.data.length > 0);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchTodos = async () => {
            const token = await AsyncStorage.getItem('token');
            try {
                const response = await axios.get('http://10.0.2.2:8080/list/userid', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setIsTodoList(response.data.length > 0);
            } catch (error) {
                console.error(error);
            }
        };

        fetchChecklist();
        fetchTodos();
    }, [isFocused]); 


    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>사용자 정보를 불러오는 중...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <VirtualizedView>
                <View style={styles.container}>
                    <Logo width={60} height={100} style={styles.logo} />
                    <Text style={styles.title}>{user.name}님 안녕하세요!</Text>
                    <Text style={styles.welcome}>목표를 꼭 이루시길 바래요!</Text>
                    <AddURL navigation={navigation} />
                    <URLonly navigation={navigation} />    
                    {isTodoList ? (
                        <TodolistCalendar navigation={navigation} />
                    ) : (
                        <CalendarOnly navigation={navigation} />
                    )}
                    {isChecklist && <Checklist />}

                    {/* 새로운 컴포넌트로 이동하는 버튼 추가 */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('JobDetailsCard')}
                    >
                        <Text style={styles.buttonText}>채용 정보 보기</Text>
                    </TouchableOpacity>
                </View>
            </VirtualizedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    logo: {
        alignSelf: 'center',
    },
    title: {
        fontSize: 26,
        fontFamily : 'NanumSquareEB',
        color: 'black',
        marginBottom: 3,
    },
    welcome: {
        fontSize: 16,
        fontFamily : 'NanumSquareR',
        color: 'black',
        marginBottom: 10,
        marginLeft: 3,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
export default MainPage;
