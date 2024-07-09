import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import Logo from '../../assets/images/logo.svg'
import Jobsite from '../../assets/images/jobsite_logo5.png';
import Copy from '../../assets/images/copy_icon.svg';
import SaraminDetails from '../../components/ui/SaraminDetails';
import JobKoreaDetails from '../../components/ui/JobKoreaDetails';
import WorkNetDetails from '../../components/ui/WorkNetDetails';
import WorkNetDetailsV2 from '../../components/ui/WorkNetDetailsV2';
import JobPlanetDetails from '../../components/ui/JobPlanetDetails';
import WantedDetails from '../../components/ui/WantedDetails';

const URLInputPage = ({ navigation }) => {
    const [inputUrl, setInputUrl] = useState('');
    const [displayText, setDisplayText] = useState('');
    const [jobDetails, setJobDetails] = useState(null);
    const [platform, setPlatform] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) {
            setInputUrl('');
            setDisplayText('');
        }
    }, [isFocused]);

    const submitUrl = async (url) => {
        try {
            const response = await axios.post('http://10.0.2.2:8000/scrape', { url });
            setJobDetails(response.data);
            if (url.includes('saramin')) {
                setPlatform('saramin');
            } else if (url.includes('jobkorea')) {
                setPlatform('jobkorea');
            } else if (url.includes('work')) {
                setPlatform(url.includes('detail') ? 'worknetV1' : 'worknetV2');
            } else if (url.includes('jobplanet')) {
                setPlatform('jobplanet');
            } else if (url.includes('wanted')) {
                setPlatform('wanted');
            }
        } catch (error) {
            console.error('Error fetching job details:', error);
        }
    };

    const handleUrlSubmit = () => {
        if (inputUrl) {
            submitUrl(inputUrl);
            navigation.navigate('JobDetailsPage', { url: inputUrl });
        }
    };

    const handleTextChange = (text) => {
        setInputUrl(text);
        setDisplayText(text.length > 39 ? text.substring(0, 39) + '..' : text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>

            </View>
            <View style={styles.searchContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="취업 공고 페이지의 URL주소를 복사하세요."
                        placeholderTextColor={'#47BDFF'}
                        value={displayText}
                        onChangeText={handleTextChange}
                
                    />
                    <TouchableOpacity style={styles.copy} onPress={handleUrlSubmit}>
                        <Copy width={24} height={24} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleUrlSubmit}>
                    <Text style={styles.buttonText}>조회하기</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Logo width={86} height={86} style={styles.logo}/>
                <Text style={styles.infoTitle}>취업 공고 추가</Text>
                <Text style={styles.infoText}>구직 사이트에서 찾으신 구직공고 페이지의</Text>
                <Text style={styles.infoText}>URL주소를 입력해주세요!</Text> 
                <Image source={Jobsite} style={styles.jobsiteLogo} />
                <Text style={styles.note}>※ 현재 위 사이트들의 URL만 조회가 가능해요.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 80
    },
    searchContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#06A4FD',
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 34,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'NanumSquareEB',
        marginBottom: 0
    },
    input: {
        flex: 1,
        height: 40,
        fontFamily: 'NanumSquareRB',
        paddingLeft: 10, 
      },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '94%',
        height: 44,
        borderWidth: 1.5,
        borderColor: '#47BDFF',
        borderRadius: 25,
        paddingLeft: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    copy: {
        position: 'absolute',
        right: 16,
    },
    infoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 28,
        fontFamily : 'NanumSquareEB',
        color: 'black',
        marginBottom: 6,
    },
    infoText: {
        fontSize: 14,
        fontFamily : 'NanumSquareB',
        textAlign: 'center',
        color: 'black',
    },
    logo: {
        marginTop: 20,
        marginBottom: 0,
    },
    jobsiteLogo: {
        width: 320,
        height: 100,
        resizeMode: 'contain',
        marginTop: 10
    },
    note: {
        fontSize: 14,
        color: '#06A4FD',
        textAlign: 'center',
        fontFamily: 'NanumSquareB',
        marginBottom: 10,
        marginTop: 10,
    },
});

export default URLInputPage;
