import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';

const JobPlanetDetails = ({ jobDetails }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{jobDetails.직무}</Text>
                <Image style={styles.logo} source={{ uri: jobDetails.회사로고 }} />
                <DetailRow label="회사명" value={jobDetails.회사명} />
                <DetailRow label="근무지역" value={jobDetails.근무지역} />
                <DetailRow label="마감일" value={jobDetails.마감일} />
                <DetailRow label="D-Day" value={jobDetails["D-Day"]} />
                <DetailRow label="직위" value={jobDetails.직위} />
                <DetailRow label="경력" value={jobDetails.경력} />
                <DetailRow label="고용형태" value={jobDetails.고용형태} />
                <DetailRow label="기술" value={jobDetails.기술} />
                <DetailRow label="기업소개" value={jobDetails.기업소개} />
                <DetailRow label="회사위치" value={jobDetails.회사위치} />
                <View style={styles.detailRow}>
                    <Text style={styles.label}>회사 홈페이지:</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(jobDetails.홈페이지)}>
                        <Text style={[styles.value, styles.link]}>{jobDetails.홈페이지}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const DetailRow = ({ label, value }) => (
    <View style={styles.detailRow}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    logo: {
        width: 100,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        flexShrink: 1,
    },
    link: {
        color: '#00aaf0',
        textDecorationLine: 'underline',
    },
});

export default JobPlanetDetails;
