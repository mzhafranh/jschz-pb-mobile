import React from "react";
import { View, ScrollView, useColorScheme, NativeSyntheticEvent, NativeScrollEvent, FlatList } from "react-native";
import PhonebookItem from "./PhonebookItem";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Phonebook } from "../App";

interface PhonebookListProps {
  phonebooks: Phonebook[];
  removePhonebook: (id: number) => void;
  updatePhonebook: (id: number, name: string, phone: string) => void;
  uploadAvatar: (file: string, id: number) => void;
  handleScroll: () => void;
}

const PhonebookList: React.FC<PhonebookListProps> = ({ phonebooks, removePhonebook, updatePhonebook, uploadAvatar, handleScroll }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <FlatList
      data={phonebooks}
      renderItem={({ item }) => (
        <PhonebookItem
          id={item.id}
          avatar={item.avatar || 'null'}
          name={item.name}
          phone={item.phone}
          remove={removePhonebook}
          update={updatePhonebook}
          uploadAvatar={uploadAvatar}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 80 }}
      onEndReached={handleScroll}
      onEndReachedThreshold={0.5}
    />
  );
}

export default PhonebookList