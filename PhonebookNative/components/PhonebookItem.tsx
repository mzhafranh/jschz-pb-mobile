import React, { useState, useRef } from "react";
import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserTie, faPenToSquare, faTrashCan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import PhonebookDeleteConfirmation from "./PhonebookDeleteConfirmation";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { local_url } from "../App";

export default function PhonebookItem({ id, avatar, name, phone, remove, update, uploadAvatar }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableName, setEditableName] = useState(name);
    const [editablePhone, setEditablePhone] = useState(phone);
    const fileInputRef = useRef(null);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleNameChange = (text) => {
        setEditableName(text);
    };

    const handlePhoneChange = (text) => {
        setEditablePhone(text);
    };

    const handleSave = () => {
        update(id, editableName, editablePhone);
        setIsEditing(false);
    };

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            Alert.alert('No file selected');
            return;
        }
        uploadAvatar(file, id);
    };

    return (
        <View style={{ marginBottom: 5, marginTop: 5 }}>
            <View style={{ backgroundColor: "#CCC", paddingLeft: 5, paddingVertical: 10, borderRadius: 5, borderStyle: "solid", borderWidth: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{borderRadius: 40, height: 80, width: 80, overflow:"hidden", display:"flex", alignItems:"center", marginRight:16}}>
                        <TouchableOpacity onPress={handleIconClick} style={{ marginHorizontal: 10 }}>
                            {avatar !== "null" ? (
                                <Image
                                    source={{ uri: `${local_url}/uploads/${avatar}` }}
                                    
                                />
                            ) : (
                                <FontAwesomeIcon icon={faUserTie} size={80} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                        {isEditing ? (
                            <>
                                <TextInput
                                    value={editableName}
                                    onChangeText={handleNameChange}
                                    style={{
                                        borderWidth: 1,
                                        padding: 5,
                                        borderRadius: 5,
                                        marginBottom: 5,
                                        backgroundColor: "#FFF",
                                    }}
                                />
                                <TextInput
                                    value={editablePhone}
                                    onChangeText={handlePhoneChange}
                                    style={{
                                        borderWidth: 1,
                                        padding: 5,
                                        borderRadius: 5,
                                        marginBottom: 5,
                                        backgroundColor: "#FFF",
                                    }}
                                />
                                <TouchableOpacity onPress={handleSave} style={{ alignSelf: "flex-start" }}>
                                    <FontAwesomeIcon icon={faFloppyDisk} size={24} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={{ marginVertical: 2 }}>{editableName}</Text>
                                <Text style={{ marginVertical: 2 }}>{editablePhone}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={handleEditClick} style={{ marginTop: 5, marginRight: 5 }}>
                                        <FontAwesomeIcon icon={faPenToSquare} size={20} />
                                    </TouchableOpacity>
                                    <PhonebookDeleteConfirmation id={id} removePhonebook={remove} />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </View>
            {/* Placeholder for file input - file uploads need to be implemented differently in React Native */}
        </View>
    );
}
