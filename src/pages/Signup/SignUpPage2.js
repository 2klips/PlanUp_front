import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Modal, Button , SafeAreaView, ScrollView} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import LoginInputBox from '../../components/ui/LoginInputBox';
import Postcode from '@actbase/react-daum-postcode';
import {validateEmail, validateHP, validateSSN, validateName} from '../../utils/validateRegex';
function SignupPage2() {
    const route = useRoute();
    const { userid, password } = route.params;

    const [isModalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [hp, setHp] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [zoneCode, setZoneCode] = React.useState('');
    const [addrDetail, setAddrDetail] = React.useState('');
    const [ssn1, setSsn1] = React.useState('');
    const [ssn2, setSsn2] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isValidHP, setIsValidHP] = useState(false);
    const [isValidSSN, setIsValidSSN] = useState(false);
    const [isValidAddress, setIsValidAddress] = useState(false);
    const [validNameText, setValidNameText] = useState('');
    const [validNameColor, setValidNameColor] = useState({ color: '#06A4FD' });
    const [validEmailText, setValidEmailText] = useState('');
    const [validEmailColor, setValidEmailColor] = useState({ color: '#06A4FD' });
    const [validHPText, setValidHPText] = useState('');
    const [validHPColor, setValidHPColor] = useState({ color: '#06A4FD' });
    const [validSSNText, setValidSSNText] = useState('');
    const [validSSNColor, setValidSSNColor] = useState({ color: '#06A4FD' });

    const handleValidateName = (name) => {
        if (name === '') {
            setIsValidName(false);
            return;
        }else{
            const isValid = validateName(name);
            if (!isValid) {
                setIsValidName(false);
                setValidNameText('이름을 다시 확인해주세요.');
                setValidNameColor({ color: 'red' });
            } else {
                setValidNameColor({ color: '#06A4FD' });
                setValidNameText('');
                setIsValidName(true);
            }
        }
    };
    const handleValidateEmail = (email) => {
        if (email === '') {
            setIsValidEmail(false);
            return;
        }else{
            const isValid = validateEmail(email);
            if (!isValid) {
                setIsValidEmail(false);
                setValidEmailText('이메일 형식을 다시 확인해주세요.');
                setValidEmailColor({ color: 'red' });
            } else {
                setValidEmailColor({ color: '#06A4FD' });
                setValidEmailText('');
                setIsValidEmail(true);
            }
        }
    };
    const handleValidateHP = (hp) => {
        if (hp === '') {
            setIsValidHP(false);
            return;
        }else{
            const isValid = validateHP(hp);
            if (!isValid) {
                setIsValidHP(false);
                setValidHPText('전화번호 형식을 다시 확인해주세요.');
                setValidHPColor({ color: 'red' });
            } else {
                setValidHPText('')
                setValidHPColor({ color: '#06A4FD' });
                setIsValidHP(true);
            }
        }
    };
    const handleValidateSSN = (ssn1, ssn2) => {
        if (ssn1 === '' || ssn2 === '') {
            setIsValidSSN(false);
            return;
        }else{
            const isValid = validateSSN(ssn1, ssn2);
            if (!isValid) {
                setIsValidSSN(false);
                setValidSSNText('주민등록번호 형식을 다시 확인해주세요.');
                setValidSSNColor({ color: 'red' });
            } else {
                setValidSSNColor({ color: '#06A4FD' });
                setValidSSNText('');
                setIsValidSSN(true);
            }
        }
    };

    const handleAddressSelect = (data) => {
        setIsValidAddress(false);
        setModalVisible(false);
        Alert.alert('주소 선택', JSON.stringify(data));
        const roadAddress = data.roadAddress;
        setZoneCode(data.zonecode);
        if(data.buildingName){
            setAddress(roadAddress + ' ' + data.buildingName);
            setIsValidAddress(true);
        }
        else{
            setAddress(roadAddress);
            setIsValidAddress(true);
        }

    };

    const isGender = (ssn2) => {
        if(ssn2[0] === '1' || ssn2[0] === '3'){
            setGender('남성');
        }
        else if(ssn2[0] === '2' || ssn2[0] === '4'){
            setGender('여성');
        }else{
            setGender('');
        }
    };
    const handleChange = (text) => {
        setSsn2(text);
        isGender(text);
    };
    const navigation = useNavigation();

    const goToSignup = () => {
        fetch('http://192.168.9.25:8080/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                userid,
                password,
                hp,
                email,
                zoneCode,
                address,
                addrDetail,
                ssn1,
                ssn2,
                gender,
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
                    <View>
                        <LoginInputBox
                            title="이름"
                            text="이름을 입력하세요"
                            value={name}
                            onChangeText={(e) => {
                                setName(e);
                                handleValidateName(e);
                            }}
                            borderColor={validNameColor.color}
                        />
                        <Text style={[styles.validateText, validNameColor]}>{validNameText}</Text>
                    </View>
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
                            value={ssn1}
                            onChangeText={setSsn1}
                        />
                        <Text style={styles.separator}>-</Text>
                        <TextInput
                            style={[styles.textInput, {flex: 1}]}
                            placeholder="뒷자리"
                            placeholderTextColor='#25A4FF'
                            maxLength={7}
                            keyboardType="numeric"
                            value={ssn2}
                            onChangeText={(e) => {
                                setSsn2(e);
                                handleChange(e);
                                handleValidateSSN(ssn1, e);
                            }}
                            secureTextEntry
                        />
                        <Text style={[styles.validateText, validSSNColor]}>{validSSNText}</Text>
                    </View>
                    <View>
                        <LoginInputBox
                            title="연락처"
                            text="전화번호를 입력하세요"
                            value={hp}
                            onChangeText={(e) => {
                                setHp(e);
                                handleValidateHP(e);
                            }}
                            keyboardType="numeric"
                            borderColor={validHPColor.color}
                        />
                        <Text style={[styles.validateText, validHPColor]}>{validHPText}</Text>
                    </View>
                    <View>
                        <LoginInputBox
                            title="이메일"
                            text="이메일을 입력하세요"
                            value={email}
                            onChangeText={(e) => {
                                setEmail(e);
                                handleValidateEmail(e);
                            }}
                            keyboardType="email-address"
                            borderColor={validEmailColor.color}
                        />
                        <Text style={[styles.validateText, validEmailColor]}>{validEmailText}</Text>
                    </View>
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
                    
                    <TouchableOpacity style={styles.button} onPress={goToSignup}>
                        <Text style={styles.buttonText}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    validateText: {
        position: 'absolute',
        right: 10,
        top: 5,
    },
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
        fontSize: 10,
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
