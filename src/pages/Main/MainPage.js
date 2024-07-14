import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AppState
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import TodolistCalendar from '../../components/ui/TodolistCalendar';
import CalendarOnly from '../../components/ui/CalendarOnly';
import Checklist from '../../components/ui/Checklist';
import AddURL from '../../components/ui/AddURL';
import URLonly from '../../components/ui/URLonly';
import Reminder from '../../components/ui/Reminder';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VirtualizedView from '../../utils/VirutalizedList';
import Logo from '../../assets/images/logo.svg';

function MainPage() {
    const { user } = useAuth();
    const [isChecklist, setIsChecklist] = useState(false);
    const [isTodoList, setIsTodoList] = useState(false);
    const [jobPostings, setJobPostings] = useState([]); // 채용 정보를 저장할 상태
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                console.log('앱이 포그라운드로 전환됩니다!');
            } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
                console.log('앱이 백그라운드로 전환됩니다!');
            }
            appState.current = nextAppState;
            console.log('AppState', appState.current);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

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

        const fetchJobPostings = async () => {
            const token = await AsyncStorage.getItem('token');
            try {
                const response = await axios.get(`http://10.0.2.2:8080/jobPostings/${user.userid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setJobPostings(response.data); // 채용 정보 상태 업데이트
            } catch (error) {
                console.error(error);
            }
        };

        fetchChecklist();
        fetchTodos();
        fetchJobPostings();
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

                    <Reminder />

                    {isTodoList ? (
                        <AddURL navigation={navigation} />
                    ) : (
                        <URLonly navigation={navigation} />
                    )}

                    {isTodoList ? (
                        <TodolistCalendar navigation={navigation} />
                    ) : (
                        <CalendarOnly navigation={navigation} />
                    )}
                    {isChecklist && <Checklist />}

                    {/* 채용 정보 표시 */}
                    <View style={styles.jobcontainer}>
                        <Text style={styles.sectionTitle}>나의 취업공고</Text>
                        {jobPostings.map((job) => (
                            <View key={job._id} style={styles.jobPosting}>
                                <Text style={styles.jobTitle}>{job.title}</Text>
                                <Text style={styles.jobCompany}>{job.company}</Text>
                                <Text style={styles.jobDeadline}>{job.deadline}</Text>
                            </View>
                        ))}
                    </View>

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
        paddingRight: 20,
    },
    logo: {
        alignSelf: 'center',
    },
    title: {
        fontSize: 26,
        fontFamily: 'NanumSquareEB',
        color: 'black',
        marginBottom: 3,
    },
    welcome: {
        fontSize: 16,
        fontFamily: 'NanumSquareR',
        color: 'black',
        marginBottom: 10,
        marginLeft: 3,
    },
    jobcontainer: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'NanumSquareEB',
        color: '#06A4FD',
        marginVertical: 10,
        marginBottom: 16,
        marginLeft: 8,
    },
    jobPosting: {
        padding: 16,
        borderWidth: 3,
        borderTopColor: '#97E5FF',
        borderLeftColor: '#97E5FF',
        borderRightColor: '#69C9FF',
        borderBottomColor: '#47BDFF',
        borderRadius: 22,
        marginVertical: 5,
    },
    jobTitle: {
        fontSize: 18,
        fontFamily: 'NanumSquareEB',
        color: 'black',
    },
    jobCompany: {
        fontSize: 14,
        fontFamily: 'NanumSquareR',
        color: 'black',
    },
    jobDeadline: {
        fontSize: 14,
        fontFamily: 'NanumSquareR',
        color: 'gray',
        textAlign: 'right',
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
