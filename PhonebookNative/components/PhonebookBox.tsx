import { StyleSheet, View, Text, useColorScheme, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import PhonebookTopBar from "./PhonebookTopBar";
import { Colors } from "react-native/Libraries/NewAppScreen";
import PhonebookList from "./PhonebookList";
import { Phonebook } from "../App";
import React from "react";

export interface PhonebookBoxProps {
    phonebooks: Phonebook[];
    page: number;
    totalPage: number;
    keyword: string;
    sort: string;
    removePhonebook: (id: number) => void;
    updatePhonebook: (id: number, name: string, phone: string) => void;
    handleFileUpload: (file: string, id: number) => void;
    addPhonebook: (name: string, phone: string) => void;
    handleScroll: () => void;
    refreshPhonebookData: (keyword: string, sort: string, page: number) => void;
  }

const PhonebookBox: React.FC<PhonebookBoxProps> = ({phonebooks, page, totalPage, keyword, sort, removePhonebook, updatePhonebook, handleFileUpload, addPhonebook, handleScroll, refreshPhonebookData}) => {
    
    console.log(page, totalPage)
    
    return (
        <>
            <View>
            <PhonebookTopBar sort={sort} keyword={keyword} addPhonebook={addPhonebook} refreshPhonebookData={refreshPhonebookData} />
            </View>
            {phonebooks ? <PhonebookList phonebooks={phonebooks} removePhonebook={removePhonebook} updatePhonebook={updatePhonebook} uploadAvatar={handleFileUpload} handleScroll={handleScroll}/>  : <Text>Loading...</Text>}
        </>
    )
}

const styles = StyleSheet.create({
})

export default PhonebookBox