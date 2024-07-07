import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DetailRow from './DetailRow';

const SaraminCompanyDetails = ({ jobDetails }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>회사 정보</Text>
            <DetailRow label="회사명" value={jobDetails.추가_회사명} />
            <DetailRow label="대표자명" value={jobDetails.대표자명} />
            <DetailRow label="기업형태" value={jobDetails.기업형태} />
            <DetailRow label="업종" value={jobDetails.업종} />
            <DetailRow label="사원수" value={jobDetails.사원수} />
            <DetailRow label="설립일" value={jobDetails.설립일} />
            <DetailRow label="매출액" value={jobDetails.매출액} />
            <DetailRow label="기업주소" value={jobDetails.기업주소} />
            <DetailRow label="홈페이지" value={jobDetails.홈페이지} />
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

export default SaraminCompanyDetails;
