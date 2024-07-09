import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import DetailRow from './DetailRow';
import Jobkorea_logo from '../../assets/images/jobkorea_logo.png';
import Arrow from '../../assets/images/arrow_black.svg';

const JobKoreaDetails = ({ jobDetails }) => {
    const handlePress = () => {
        const { URL } = jobDetails;
        if (URL) {
            Linking.openURL(URL)
                .catch(err => console.error("URL을 열 수 없습니다:", err));
        } else {
            console.error("URL이 정의되지 않았습니다.");
        }
    };

    // D-day 계산
    const calculateDday = (endDate) => {
        const today = moment();
        const end = moment(endDate, 'YYYY.MM.DD HH:mm');
        return end.diff(today, 'days');
    };

    const dDay = jobDetails.마감일 ? calculateDday(jobDetails.마감일) : null;
    const closingDateText = dDay !== null ? `D-${dDay}` : '수시채용';

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Image style={styles.jobkorea_logo} source={Jobkorea_logo} />
                        <Text style={styles.siteName}>잡코리아</Text>
                    </View>
                    <Text style={styles.title}>{jobDetails.제목}</Text>
                    <Image style={styles.logo} source={{ uri: jobDetails.회사로고 }} />
                    <DetailRow label="회사명" value={jobDetails.회사명} />
                    {/* <DetailRow label="접수일" value={jobDetails.접수일} />
                    <DetailRow label="마감일" value={jobDetails.마감일} /> */}
                    <DetailRow label="경력" value={jobDetails.경력} />
                    <DetailRow label="학력" value={jobDetails.학력} />
                    <DetailRow label="고용형태" value={jobDetails.고용형태} />
                    <DetailRow label="지역" value={jobDetails.지역} />
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>접수 시작일: {jobDetails.접수시작일 || '수시채용'}</Text>
                        <Text style={styles.footerText}>접수 마감일: {jobDetails.마감일 || '수시채용'}</Text>
                    </View>
                    <View style={styles.moveToSite}>
                        <TouchableOpacity onPress={handlePress}>
                            <Image style={styles.moveToSite_logo} source={Jobkorea_logo} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePress}>
                            <Text style={styles.moveToSite_text}>사이트로 이동</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePress}>
                            <Arrow width={14} height={14} style={styles.arrow} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    cardContainer: {
        borderTopWidth: 4,
        borderBottomWidth: 4,
        borderTopColor: '#ff7e5f', // 첫 번째 색상
        borderBottomColor: '#feb47b', // 두 번째 색상
        borderRadius: 30,
        overflow: 'hidden',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 26,
        padding: 16,
    },
    header: {
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    siteName: {
        fontSize: 10,
        fontFamily: 'NanumSquareEB',
        color: '#676767',
        marginTop: 0,
    },
    jobkorea_logo: {
        width: 80,
        height: 30,
        resizeMode: 'contain',
        marginRight: 6,
    },
    title: {
        fontSize: 24,
        color: 'black',
        fontFamily: 'NanumSquareEB',
        marginBottom: 8,
        marginTop: -4,
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 0,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#e1e1e1',
        paddingTop: 8,
    },
    footerText: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4,
        fontFamily: 'NanumSquareB',
    },
    moveToSite: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    moveToSite_logo: {
        width: 80,
        height: 30,
        resizeMode: 'contain',
        marginRight: 8,
    },
    moveToSite_text: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'NanumSquareEB',
        marginBottom: 0,
    },
    arrow: {
        marginTop: 0,
        marginLeft: 4,
    },
});

export default JobKoreaDetails;
