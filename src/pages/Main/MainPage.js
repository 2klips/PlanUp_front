import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import Card from '../../components/ui/Card';

function MainPage() {
    const user = '김철수';
    return (
        <View style={styles.container}>
            <Image
                style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
                source={{
                uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
                }}
            />
            <Text style={styles.title}>{user}님 안녕하세요!</Text>
            <Text style={{marginBottom:10}}>오늘도 새로운 회사가 {user}님을 필요로 해요!</Text>
            <Card title="지원한 회사" text="좋은 소식이 있을거에요" num="6" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom:5}}/>
            <Card title="새로운 공고" text="공고를 확인해보세요" num="12" style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
export default MainPage;