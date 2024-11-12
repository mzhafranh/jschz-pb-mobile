import React from "react";
import { View, ScrollView, useColorScheme } from "react-native";
import PhonebookItem from "./PhonebookItem";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function PhonebookList({ data, removePhonebook, updatePhonebook, uploadAvatar, handleScroll }) {
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
      {data.map((phonebook) => (
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
