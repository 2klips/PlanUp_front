import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import DetailRow from './DetailRow';

const JobKoreaDetails = ({ jobDetails }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>채용 공고</Text>
                <Text style={styles.title}>{jobDetails.제목}</Text>
                <Image style={styles.logo} source={{ uri: jobDetails.회사로고 }} />
                <DetailRow label="회사명" value={jobDetails.회사명} />
                <DetailRow label="접수일" value={jobDetails.접수일} />
                <DetailRow label="마감일" value={jobDetails.마감일} />
                <DetailRow label="경력" value={jobDetails.경력} />
                <DetailRow label="학력" value={jobDetails.학력} />
                <DetailRow label="우대사항" value={jobDetails.우대사항} />
                <DetailRow label="고용형태" value={jobDetails.고용형태} />
                <DetailRow label="급여" value={jobDetails.급여} />
                <DetailRow label="지역" value={jobDetails.지역} />
                <DetailRow label="시간" value={jobDetails.시간} />
                <DetailRow label="직책" value={jobDetails.직책} />
                <DetailRow label="핵심역량" value={jobDetails.핵심역량} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
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
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
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
        marginBottom: 16,
    },
});

export default JobKoreaDetails;
