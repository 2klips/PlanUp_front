import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import DetailRow from './DetailRow';

const WorkNetDetailsV2 = ({ jobDetails }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <DetailRow label="회사이름" value={jobDetails.회사이름} />
                <DetailRow label="채용제목" value={jobDetails.채용제목} />
                <DetailRow label="접수기간" value={jobDetails.접수기간} />
                {jobDetails['D-Day'] && <DetailRow label="D-Day" value={jobDetails['D-Day']} />}
                <DetailRow label="업종" value={jobDetails.업종} />
                <DetailRow label="홈페이지" value={jobDetails.홈페이지} />
                <DetailRow label="회사주소" value={jobDetails.회사주소} />
                <Text style={styles.label}>회사로고:</Text>
                <Image style={styles.logo} source={{ uri: jobDetails.회사로고 }} />
                <DetailRow label="모집부문및자격요건" value={jobDetails.모집부문및자격요건} />
                <DetailRow label="고용형태" value={jobDetails.고용형태} />
                <DetailRow label="공통사항" value={jobDetails.공통사항} />
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
    label: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 16,
    },
});

export default WorkNetDetailsV2;
