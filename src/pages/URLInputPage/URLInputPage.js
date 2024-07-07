import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import SaraminDetails from '../../components/ui/SaraminDetails';
import JobKoreaDetails from '../../components/ui/JobKoreaDetails';
import WorkNetDetails from '../../components/ui/WorkNetDetails';
import WorkNetDetailsV2 from '../../components/ui/WorkNetDetailsV2';
import JobPlanetDetails from '../../components/ui/JobPlanetDetails';
import WantedDetails from '../../components/ui/WantedDetails';

const URLInputPage = ({ navigation }) => {
    const [inputUrl, setInputUrl] = useState('');
    const [jobDetails, setJobDetails] = useState(null);
    const [platform, setPlatform] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) {
            setInputUrl('');
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

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="URL 입력"
                value={inputUrl}
                onChangeText={setInputUrl}
            />
            <Button title="제출" onPress={handleUrlSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 12,
    },
});

export default URLInputPage;
