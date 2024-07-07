import React from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import moment from 'moment';
import DetailRow from './DetailRow'; // DetailRow 컴포넌트 임포트

const SaraminDetails = ({ jobDetails }) => {
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
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.siteName}>saramin 사람인</Text>
                <Text style={styles.title}>[ {jobDetails.회사명} ] {jobDetails.직무}</Text>
            </View>
            <Image style={styles.logo} source={{ uri: jobDetails.로고이미지 }} />
            <View style={styles.details}>
                <DetailRow label="경력 조건" value={jobDetails.경력} />
                <DetailRow label="학력" value={jobDetails.학력} />
                <DetailRow label="급여" value={jobDetails.급여} />
                <DetailRow label="근무 시간" value={jobDetails.근무시간} />
                <DetailRow label="근무지역" value={jobDetails.근무지역} />
                <DetailRow label="근무형태" value={jobDetails.근무형태} />
                <DetailRow label="근무일시" value={jobDetails.근무일시} />
            </View>
            <Text style={styles.date}>{closingDateText}</Text>
            <Text style={styles.closingDate}>{jobDetails.마감일}</Text>
            <View style={styles.footer}>
                <Text style={styles.footerText}>접수 시작일: {jobDetails.접수시작일 || '수시채용'}</Text>
                <Text style={styles.footerText}>접수 마감일: {jobDetails.마감일 || '수시채용'}</Text>
            </View>
            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.moveToSite}>saramin 사이트로 이동 →</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 2,
        borderColor: '#0077B6',
    },
    header: {
        marginBottom: 16,
    },
    siteName: {
        fontSize: 12,
        color: '#999',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 16,
    },
    details: {
        borderTopWidth: 1,
        borderTopColor: '#e1e1e1',
        paddingTop: 16,
        marginTop: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        flexWrap: 'wrap',  // 추가: 텍스트가 길 경우 줄 바꿈
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0077B6',
        flex: 1,  // 추가: 레이아웃 정리
    },
    detailValue: {
        fontSize: 14,
        color: '#555',
        flex: 2,  // 추가: 레이아웃 정리
    },
    date: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF0000',
        textAlign: 'right',
        marginVertical: 16,
    },
    closingDate: {
        fontSize: 14,
        color: '#555',
        textAlign: 'right',
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
    },
    moveToSite: {
        fontSize: 14,
        color: '#0077B6',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default SaraminDetails;
