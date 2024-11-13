import React from "react";
import { View, ScrollView, useColorScheme, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import PhonebookItem from "./PhonebookItem";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Phonebook } from "../App";

interface PhonebookListProps {
  phonebooks: Phonebook[];
  removePhonebook: (id: number) => void;
  updatePhonebook: (id: number, name: string, phone: string) => void;
  uploadAvatar: (file: string, id: number) => void;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const PhonebookList: React.FC<PhonebookListProps> = ({ phonebooks, removePhonebook, updatePhonebook, uploadAvatar, handleScroll }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      };
  return (
    <ScrollView 
    contentInsetAdjustmentBehavior="automatic"
    style={backgroundStyle}
    contentContainerStyle={{paddingLeft: 10, paddingRight: 10, paddingBottom: 80}}
    onScroll={handleScroll}
    scrollEventThrottle={100}>
      {phonebooks.map((phonebook) => (
        <PhonebookItem
          key={phonebook.id}
          id={phonebook.id}
          avatar={phonebook.avatar || 'null'}
          name={phonebook.name}
          phone={phonebook.phone}
          remove={removePhonebook}
          update={updatePhonebook}
          uploadAvatar={uploadAvatar}
        />
      ))}
    </ScrollView>
  );
}

export default PhonebookList