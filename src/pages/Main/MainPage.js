import React, { useEffect, useState }  from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
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
                const response = await axios.get('http://10.0.2.2:8080/checklist', {
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
                const response = await axios.get('http://10.0.2.2:8080/list', {
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
        <SafeAreaView style={{ flex: 1 }}>
            <VirtualizedView>
                <View style={styles.container}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
                        source={{
                        uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
                        }}
                    />
                    <Text style={styles.title}>{user.name}님 안녕하세요!</Text>
                    <Text style={{marginBottom:10}}>오늘도 새로운 회사가 {user.name}님을 필요로 해요!</Text>
                    <Card title="새로운 공고" text="작성한 이력서에 맞게 추천 해드려요" num="6" style={{ borderRadius: 30, marginBottom:5}}/>
                    <AddURL navigation={navigation}/>
                    <URLonly navigation={navigation}/>
                    {isTodoList ? (
                        <TodolistCalendar navigation={navigation} />
                    ) : (
                        <CalendarOnly navigation={navigation} />
                    )}
                    {isChecklist && <Checklist />}
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
export default MainPage;