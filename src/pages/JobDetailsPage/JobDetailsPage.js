import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import SaraminDetails from '../../components/ui/SaraminDetails';
import SaraminCompanyDetails from '../../components/ui/SaraminCompanyDetails';
import WorkNetDetails from '../../components/ui/WorkNetDetails';
import WorkNetCompanyDetails from '../../components/ui/WorkNetCompanyDetails';
import WorkNetDetailsV2 from '../../components/ui/WorkNetDetailsV2';
import JobKoreaDetails from '../../components/ui/JobKoreaDetails';
import JobKoreaCompanyDetails from '../../components/ui/JobKoreaCompanyDetails';
import WantedDetails from '../../components/ui/WantedDetails';
import JobPlanetDetails from '../../components/ui/JobPlanetDetails';

import Saramin_logo from '../../assets/images/saramin_logo.png';
import Jobkorea_logo from '../../assets/images/jobkorea_logo.png';
import Jobplanet_logo from '../../assets/images/jobplanet_logo.png';
import Success from '../../assets/images/success_icon.svg';
import Back from '../../assets/images/back_icon.svg';

const JobDetailsPage = ({ route }) => {
    const { url } = route.params;
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [platform, setPlatform] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.post('http://10.0.2.2:8000/scrape', { url });
                setJobDetails(response.data);
                if (url.includes('saramin')) {
                    setPlatform('saramin');
                } else if (url.includes('work')) {
                    setPlatform(url.includes('detail') ? 'worknetV1' : 'worknetV2');
                } else if (url.includes('jobkorea')) {
                    setPlatform('jobkorea');
                } else if (url.includes('wanted')) {
                    setPlatform('wanted');
                } else if (url.includes('jobplanet')) {
                    setPlatform('jobplanet');
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [url]);

    const addToCalendar = () => {
        // 여기에 캘린더에 이벤트를 추가하는 로직을 구현하세요.
        Alert.alert("캘린더에 추가", "해당 공고가 캘린더에 추가되었습니다.");
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {jobDetails ? (
                    <>
                        {platform === 'saramin' && (
                            <>
                                <TouchableOpacity style={styles.backbutton} onPress={() => navigation.navigate('URLInputPage')}>
                                    <Text style={styles.backText}>다시 입력하기</Text>
                                    <Back width={18} height={18} style={styles.backIcon} />
                                </TouchableOpacity>
                                <View style={styles.header}>
                                    <Success width={60} height={60} style={styles.success}/>
                                    <Image style={styles.saramin_logo} source={Saramin_logo} />
                                    <Text style={styles.title}>취업공고를 불러왔어요!</Text>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.addText}>해당 공고를 캘린더에 추가하기</Text>
                                    <TouchableOpacity onPress={addToCalendar} style={styles.addbutton}>
                                        <Text Text style={styles.buttonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <SaraminDetails jobDetails={jobDetails} />
                                <SaraminCompanyDetails jobDetails={jobDetails} />
                            </>
                        )}
                        {platform === 'worknetV1' && (
                            <>
                                <Text style={styles.title}>취업공고를 불러왔어요!</Text>
                                <WorkNetDetails jobDetails={jobDetails} />
                                <WorkNetCompanyDetails jobDetails={jobDetails} />
                            </>
                        )}
                        {platform === 'worknetV2' && (
                            <>
                                <Text style={styles.title}>취업공고를 불러왔어요!</Text>
                                <WorkNetDetailsV2 jobDetails={jobDetails} />
                            </>
                        )}
                        {platform === 'jobkorea' && (
                            <>
                                <TouchableOpacity style={styles.backbutton} onPress={() => navigation.navigate('URLInputPage')}>
                                    <Text style={styles.backText}>다시 입력하기</Text>
                                    <Back width={18} height={18} style={styles.backIcon} />
                                </TouchableOpacity>
                                <View style={styles.header}>
                                    <Success width={60} height={60} style={styles.success}/>
                                    <Image style={styles.jobkorea_logo} source={Jobkorea_logo} />
                                    <Text style={styles.title}>취업공고를 불러왔어요!</Text>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.addText}>해당 공고를 캘린더에 추가하기</Text>
                                    <TouchableOpacity onPress={addToCalendar} style={styles.addbutton}>
                                        <Text Text style={styles.buttonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <JobKoreaDetails jobDetails={jobDetails} />
                                <JobKoreaCompanyDetails jobDetails={jobDetails} />
                            </>
                        )}
                        {platform === 'wanted' && (
                            <>
                                <Text style={styles.title}>취업공고를 불러왔어요!</Text>
                                <WantedDetails jobDetails={jobDetails} />
                            </>
                        )}
                        {platform === 'jobplanet' && (
                            <>
                                <TouchableOpacity style={styles.backbutton} onPress={() => navigation.navigate('URLInputPage')}>
                                    <Text style={styles.backText}>다시 입력하기</Text>
                                    <Back width={18} height={18} style={styles.backIcon} />
                                </TouchableOpacity>
                                <View style={styles.header}>
                                    <Success width={60} height={60} style={styles.success}/>
                                    <Image style={styles.jobplanet_logo} source={Jobplanet_logo} />
                                    <Text style={styles.title}>취업공고를 불러왔어요!</Text>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.addText}>해당 공고를 캘린더에 추가하기</Text>
                                    <TouchableOpacity onPress={addToCalendar} style={styles.addbutton}>
                                        <Text Text style={styles.buttonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <JobPlanetDetails jobDetails={jobDetails} />
                            </>
                        )}
                    </>
                ) : (
                    <Text>데이터를 불러오는 중 오류가 발생했습니다.</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'NanumSquareEB',
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    backbutton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backText: {
        fontSize: 14,
        fontFamily: 'NanumSquareEB',
        color: '#06A4FD',
        marginRight: 4,
    },
    backIcon: {
        marginRight: 10,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    success: {
        marginBottom: 4,
    },
    
    saramin_logo: {
        width: 120,
        height: 26,
        resizeMode: 'contain',
        marginBottom: 2,
    },
    jobkorea_logo: {
        width: 140,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 2,
    },
    jobplanet_logo: {
        width: 140,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 2,
    },

    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    addText: {
        fontSize: 18,
        fontFamily: 'NanumSquareEB',
        color: '#06A4FD',
        marginRight: 10,
    },
    addbutton: {
        backgroundColor: '#06A4FD', 
        borderRadius: 1,
        paddingHorizontal: 10,
        paddingVertical: 1,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        lineHeight: 30,
    },
});

export default JobDetailsPage;
