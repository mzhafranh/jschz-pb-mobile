import React, { useState, useRef } from "react";
import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserTie, faPenToSquare, faTrashCan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import PhonebookDeleteConfirmation from "./PhonebookDeleteConfirmation";
import { local_url } from "../App";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { handleFileUpload, updatePhonebook } from "../slices/phonebookSlice";

interface PhonebookItemProps {
    id: number;
    name: string;
    phone: string;
    avatar: string | null;
  }

const PhonebookItem: React.FC<PhonebookItemProps> = ({ id, avatar, name, phone}) => {
    const { keyword, sort} = useSelector((state: RootState) => state.phonebookReducer);
    const dispatch = useDispatch<AppDispatch>();

    const [isEditing, setIsEditing] = useState(false);
    const [editableName, setEditableName] = useState(name);
    const [editablePhone, setEditablePhone] = useState(phone);


    const handlePickImage = () => {
        launchImageLibrary(
          {
            mediaType: 'photo',
            quality: 0.5, // Set image quality between 0 and 1
            maxWidth: 600, // Resize image
            maxHeight: 600,
          },
          (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.errorCode) {
              console.log('ImagePicker Error: ', response.errorCode);
            } else if (response.assets && response.assets[0] && response.assets[0].uri) {
              // Set the selected image's URI to the state
              const selectedImageUri = response.assets[0].uri;
              if (selectedImageUri) {
                dispatch(handleFileUpload({file:selectedImageUri, id, keyword, sort}));
                console.log('Image uploaded successfully:', selectedImageUri);
              }
            }
          }
        );
      };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleNameChange = (text: string) => {
        setEditableName(text);
    };

    const handlePhoneChange = (text: string) => {
        setEditablePhone(text);
    };

    const handleSave = () => {
        dispatch(updatePhonebook({id, name:editableName, phone:editablePhone}));
        setIsEditing(false);
    };

    return (
        <View style={{ marginBottom: 5, marginTop: 5 }}>
            <View style={{ backgroundColor: "#CCC", paddingLeft: 10, paddingVertical: 10, borderRadius: 5, borderStyle: "solid", borderWidth: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{borderRadius: 40, height: 80, width: 80, overflow:"hidden", display:"flex", alignItems:"center", marginRight:16}}>
                        <TouchableOpacity onPress={handlePickImage} style={{ marginHorizontal: 10 }}>
                            {avatar !== "null" ? (
                                <Image
                                    source={{ uri: `${local_url}/uploads/${avatar}` }}
                                    resizeMode="cover"
                                    style={{ width: 80, height: 80, borderRadius: 40 }}
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
                                    <PhonebookDeleteConfirmation id={id} />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

export default PhonebookItem