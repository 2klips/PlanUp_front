import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
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

const JobDetailsPage = ({ route }) => {
    const { url } = route.params;
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [platform, setPlatform] = useState('');

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
            <TouchableOpacity onPress={addToCalendar} style={styles.calendarButton}>
                <Text style={styles.calendarButtonText}>해당 공고를 캘린더에 추가하기</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {jobDetails ? (
                    <>
                        {platform === 'saramin' && (
                            <>
                                <Text style={styles.title}>채용 정보</Text>
                                <SaraminDetails jobDetails={jobDetails} />
                                <SaraminCompanyDetails jobDetails={jobDetails} />
                            </>
                        )}
                        {platform === 'worknetV1' && (
                            <>
                                <Text style={styles.title}>채용 정보</Text>
                                <WorkNetDetails jobDetails={jobDetails} />
                                <WorkNetCompanyDetails jobDetails={jobDetails} />
                            </>
                        )}
                        {platform === 'worknetV2' && (
                            <>
                                <Text style={styles.title}>회사 정보</Text>
                                <WorkNetDetailsV2 jobDetails={jobDetails} />
                            </>
                        )}
                        {platform === 'jobkorea' && (
                            <>
                                <Text style={styles.title}>채용 정보</Text>
                                <JobKoreaDetails jobDetails={jobDetails} />
                                <JobKoreaCompanyDetails jobDetails={jobDetails} />
                            </>
                        )}
                        {platform === 'wanted' && (
                            <>
                                <Text style={styles.title}>채용 정보</Text>
                                <WantedDetails jobDetails={jobDetails} />
                            </>
                        )}
                        {platform === 'jobplanet' && (
                            <>
                                <Text style={styles.title}>채용 정보</Text>
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
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    calendarButton: {
        backgroundColor: '#0077B6',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },
    calendarButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default JobDetailsPage;
