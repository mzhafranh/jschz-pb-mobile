import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { removePhonebook } from '../slices/phonebookSlice';

interface PhonebookDeleteConfirmationProps {
    id: number;
  }

const PhonebookDeleteConfirmation: React.FC<PhonebookDeleteConfirmationProps> = ({id}) => {
    const { keyword, sort} = useSelector((state: RootState) => state.phonebookReducer);
    const dispatch = useDispatch<AppDispatch>();

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleOpenConfirmation = () => {
        setIsFormVisible(true);
    };

    const handleCloseConfirmation = () => {
        setIsFormVisible(false);
    };

    const handleDelete = () => {
        dispatch(removePhonebook({id, keyword, sort}));
        setIsFormVisible(false);
    };

    return (
        <>
            <TouchableOpacity onPress={handleOpenConfirmation} style={{ marginTop: 5 }}>
                <FontAwesomeIcon icon={faTrashCan} size={20}/>
            </TouchableOpacity>

            <Modal
                transparent={true}
                animationType="fade"
                visible={isFormVisible}
                onRequestClose={handleCloseConfirmation}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Apakah anda yakin menghapus data ini?</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#AF8210' }]}
                                onPress={handleDelete}
                            >
                                <Text style={styles.buttonText}>Ya</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#AF8210' }]}
                                onPress={handleCloseConfirmation}
                            >
                                <Text style={styles.buttonText}>Tidak</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    deleteButton: {
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
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
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
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

export default PhonebookDeleteConfirmation
