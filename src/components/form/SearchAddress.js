import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import Postcode from '@actbase/react-daum-postcode'; // Assuming you are using this for address search

const SearchAddress = ({ onSelectAddress }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');

    const handleAddressSelect = (data) => {
        setSelectedAddress(data.address);
        setIsModalVisible(false);
        onSelectAddress(data.address); // Pass selected address to parent component if needed
    };

    return (
        <View style={styles.container}>
            <Button title="우편번호 검색" onPress={() => setIsModalVisible(true)} />
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>우편번호 검색</Text>
                    <Postcode style={styles.postcode} onComplete={handleAddressSelect} />
                    <Button title="닫기" onPress={() => setIsModalVisible(false)} />
                </View>
            </Modal>
            <Text style={styles.selectedAddress}>선택된 주소: {selectedAddress}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    postcode: {
        width: '100%',
        height: 400,
    },
    selectedAddress: {
        marginTop: 20,
    },
});

export default SearchAddress;
