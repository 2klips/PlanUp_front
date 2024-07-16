import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AppState,
    Dimensions,
    Image,
    Linking,
    Alert
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import TodolistCalendar from '../../components/ui/TodolistCalendar';
import CalendarOnly from '../../components/ui/CalendarOnly';
import Checklist from '../../components/ui/Checklist';
import AddURL from '../../components/ui/AddURL';
import URLonly from '../../components/ui/URLonly';
import Reminder from '../../components/ui/Reminder';
import Swiper from 'react-native-web-swiper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VirtualizedView from '../../utils/VirutalizedList';
import Logo from '../../assets/images/logo.svg';
import { API_URL } from '@env';



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
                const response = await axios.get(`${API_URL}/checklist/userid`, {
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
                const response = await axios.get(`${API_URL}/list/userid`, {
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
                const response = await axios.get(`${API_URL}/jobPostings/${user.userid}`, {
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

    const {setIsLoggedIn, setUser } = useAuth();
    const handleLogout = (navigation, setIsLoggedIn, setUser) => {
        Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () =>  {
                AsyncStorage.removeItem('token')
                    .then(() => {
                        setIsLoggedIn(false);
                        setUser(null);
                        console.log('로그아웃 성공');
                        Alert.alert('로그아웃 성공', '로그아웃 되었습니다.');
                        navigation.navigate('LoginPage');
                    })
                    .catch((error) => {
                        console.error('로그아웃 오류:', error);
                        Alert.alert('로그아웃 오류', '로그아웃 중 오류가 발생했습니다.', error);
                    });
            }}
        ]);
    };

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
                <TouchableOpacity 
                onPress={() => handleLogout(navigation, setIsLoggedIn, setUser)}
                style={{ marginRight: 10 }}>
                    <Text style={styles.logout}>로그아웃</Text>
                </TouchableOpacity>
                    {/* <Logo width={60} height={100} style={styles.logo} />
                     */}
                     <Image 
                        source={require('../../assets/images/logo_ani.gif')}  
                        style={{width: 80, height: 100, resizeMode: 'contain', marginBottom: 0, marginTop: 0, alignSelf: 'center'}}
                    />
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

                     {/*AD*/}
                    <View style={styles.sliderContainer}>
                        <Swiper loop 
                                autoplay 
                                timeout={5} 
                                controlsEnabled 
                                controlsProps={{
                                    prevPos: false,
                                    nextPos: false,
                                    dotsTouchable: true, 
                            }}>
                            <TouchableOpacity style={styles.slide} onPress={() => Linking.openURL('https://www.2024datacontest.co.kr/')}>
                                <Image source={require('../../assets/images/Ad01.png')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.slide} onPress={() => Linking.openURL('https://motijobfair.com/')}>
                                <Image source={require('../../assets/images/Ad02.png')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.slide} onPress={() => Linking.openURL('https://fome-jobfair.com/main/main.php')}>
                                <Image source={require('../../assets/images/Ad03.png')} style={styles.image} />
                            </TouchableOpacity>
                        </Swiper>
                    </View>
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
    logout : {
        fontFamily: 'NanumSquareEB',
        color: '#06A4FD',
        textAlign: 'right',
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
    sliderContainer: {
        height: 200,
        width: '100%',
        marginBottom: 30,
        marginTop: 30,
        
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, // 테두리 너비 설정
        borderColor: 'white', // 테두리 색상 설정 (여기서는 검정색)
        borderRadius: 24, // 테두리 둥글게 설정
        overflow: 'hidden', // 자식 요소가 테두리를 넘지 않도록 설정
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
export default MainPage;
