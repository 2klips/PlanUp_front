import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Modal, Button , SafeAreaView, ScrollView} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import LoginInputBox from '../../components/ui/LoginInputBox';
import Postcode from '@actbase/react-daum-postcode';

function SignupPage2() {
    const route = useRoute();
    const { username, password } = route.params;

    const [isModalVisible, setModalVisible] = useState(false);
    // const [selectedAddress, setSelectedAddress] = useState('');

    const handleAddressSelect = (data) => {
        // setSelectedAddress(JSON.stringify(data));
        setModalVisible(false);
        Alert.alert('주소 선택', JSON.stringify(data));
        const roadAddress = data.roadAddress;
        setZoneCode(data.zonecode);
        if(data.buildingName){
            setAddress(roadAddress + ' ' + data.buildingName);
        }
        else{
            setAddress(roadAddress);
        }

    };


    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [zoneCode, setZoneCode] = React.useState('');
    const [addrDetail, setAddrDetail] = React.useState('');
    const [rrn1, setrrn1] = React.useState('');
    const [rrn2, setrrn2] = React.useState('');


    const navigation = useNavigation();

    const goToSignup = () => {
        fetch('http://192.168.56.1:8080/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                email,
                name,
                phone,
                address,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Signup 성공:', data);
            Alert.alert('Signup 성공', '회원가입에 성공했습니다.');
            navigation.navigate('LoginPage');
        })
        .catch((error) => {
            console.error('Signup 오류:', error);
            Alert.alert('Signup 오류', '회원가입 중 오류가 발생했습니다.', error);
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.textBox}>
                        <Text style={styles.subText}>추가 정보를 입력해주세요.</Text>
                    </View>
                    <LoginInputBox
                        title="이름"
                        text="이름을 입력하세요"
                        value={name}
                        onChangeText={setName}
                    />
                    <View style={styles.labelBox}>
                        <Text style={styles.label}>주민등록번호</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="앞자리"
                            placeholderTextColor='#25A4FF'
                            maxLength={6}
                            keyboardType="numeric"
                            value={rrn1}
                            onChangeText={setrrn1}
                        />
                        <Text style={styles.separator}>-</Text>
                        <TextInput
                            style={[styles.textInput, {flex: 1}]}
                            placeholder="뒷자리"
                            placeholderTextColor='#25A4FF'
                            maxLength={7}
                            keyboardType="numeric"
                            value={rrn2}
                            onChangeText={setrrn2}
                            secureTextEntry
                        />
                    </View>
                    <LoginInputBox
                        title="연락처"
                        text="전화번호를 입력하세요"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="numeric"
                    />
                    <LoginInputBox
                        title="이메일"
                        text="이메일을 입력하세요"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <View>
                        <View>
                            <View>
                                <Modal visible={isModalVisible} animationType="slide">
                                    <View style={styles.modalContainer}>
                                        <Postcode
                                            style={styles.postcode}
                                            jsOptions={{ animation: true, hideMapBtn: true }}
                                            onSelected={handleAddressSelect}
                                        />
                                        <Button title="닫기" onPress={() => setModalVisible(false)} />
                                    </View>
                                </Modal>
                            </View>
                                <LoginInputBox
                                    title="주소"
                                    text="주소/도로명 주소"
                                    value={address}
                                    onChangeText={setAddress}
                                    editable={false}
                                />
                                <TouchableOpacity style={styles.smallButton} onPress={() => setModalVisible(true)} >
                                    <Text style={styles.smallButtonText}>주소검색</Text>
                                </TouchableOpacity>
                            <View style={styles.inputContainer}>
                                {/* <LoginInputBox
                                    text="우편번호"
                                    value={zoneCode}
                                    onChangeText={setZoneCode}
                                    editable={false}
                                /> */}
                                <TextInput
                                    placeholder="우편번호"
                                    placeholderTextColor='#25A4FF'
                                    value={zoneCode}
                                    onChangeText={setZoneCode}
                                    textAlign='center'
                                    style={styles.textInput}
                                    editable={false}
                                />
                                <Text style={styles.separator}></Text>
                                {/* <LoginInputBox
                                    text="상세 주소를 입력 해주세요"
                                    value={addrDetail}
                                    onChangeText={setAddrDetail}
                                /> */}
                                <TextInput
                                    placeholder="상세 주소를 입력 해주세요"
                                    placeholderTextColor='#25A4FF'
                                    value={addrDetail}
                                    onChangeText={setAddrDetail}
                                    textAlign='center'
                                    style={[styles.textInput, {width: 155, fontSize: 12}]}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={goToSignup}>
                        <Text style={styles.buttonText}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    postcode: {
        width: '100%',
        height: '90%',
    },

    smallButton: {
        backgroundColor: '#06A4FD',
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 5,
        width: 70,
        height: 20,
        position: 'absolute',
        right: 10,
        top: 5,
    },
    smallButtonText: {
        color: 'white',
        fontSize: 9,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#06A4FD',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 5,
        width: 100,
        height: 35,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#25A4FF'
    },
    subText: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    textBox: {
        marginLeft: 65,
        marginBottom: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
    },
    labelBox: {
        marginLeft: 65,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
    },
    label: {
        color: '#25A4FF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 5,
        textAlign: 'left',
    },
    separator: {
        paddingHorizontal: 8,
        fontSize: 18,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
    },
    textInput: {
        width: 130,
        height: 45,
        borderColor: '#25A4FF',
        borderWidth: 2,
        borderRadius: 13,
        marginBottom: 10,
        paddingLeft: 10,
        textAlign: 'left',
    },
});

export default SignupPage2;
