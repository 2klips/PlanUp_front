import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DetailRow from './DetailRow';

const JobKoreaCompanyDetails = ({ jobDetails }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>회사 정보</Text>
            <DetailRow label="산업(업종)" value={jobDetails.산업업종} />
            <DetailRow label="사원수" value={jobDetails.사원수} />
            <DetailRow label="설립년도" value={jobDetails.설립년도} />
            <DetailRow label="기업형태" value={jobDetails.기업형태} />
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
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
});

export default JobKoreaCompanyDetails;
