import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
// import { useSelector, useDispatch } from 'react-redux';
// import { addPhonebook } from '../actions';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addPhonebook } from '../slices/phonebookSlice';

// interface PhonebookFormProps {
//     addPhonebook: (name:string, phone:string) => void;
//     keyword: string;
//     sort: string;
// }

const PhonebookForm = () => {
    const { keyword, sort} = useSelector((state: RootState) => state.phonebookReducer);
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const navigation = useNavigation();

    const handleCloseForm = () => {
        navigation.navigate('Home')
    };

    const handleSubmit = () => {
        dispatch(addPhonebook({name, phone, keyword, sort}));
        console.log("Form Submitted", { name, phone });
        setName("");
        setPhone("");
        navigation.navigate('Home')
    };

    return (
        <View aria-label="PhonebookForm">
            {/* Fullscreen form modal */}
            <Modal
                animationType="fade"
                onRequestClose={handleCloseForm}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter phone number"
                            value={phone}
                            onChangeText={setPhone}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#AF8210' }]}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#AF8210' }]}
                                onPress={handleCloseForm}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        padding: 10,
        backgroundColor: '#AF8210',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default PhonebookForm