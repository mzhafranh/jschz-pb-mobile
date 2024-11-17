import { StyleSheet, View, Text } from "react-native";
import PhonebookTopBar from "./PhonebookTopBar";
import PhonebookList from "./PhonebookList";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react"
import { fetchPhonebookData, setPage } from "../slices/phonebookSlice";
import { RootState, AppDispatch } from "../store";


// export interface PhonebookBoxProps {
//     phonebooks: Phonebook[];
//     page: number;
//     totalPage: number;
//     keyword: string;
//     sort: string;
//     removePhonebook: (id: number) => void;
//     updatePhonebook: (id: number, name: string, phone: string) => void;
//     handleFileUpload: (file: string, id: number) => void;
//     addPhonebook: (name: string, phone: string) => void;
//     handleScroll: () => void;
//     refreshPhonebookData: (keyword: string, sort: string, page: number) => void;
//   }

const PhonebookBox = () => {
  const { phonebooks, page, loading, totalPage, keyword, sort, error } = useSelector((state: RootState) => state.phonebookReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPhonebookData({ keyword: '', sort: 'asc', page: 1 }));
  }, [dispatch]);
    
    return (
        <>
            <View>
              <PhonebookTopBar/>
            </View>
            {phonebooks ? <PhonebookList/>  : <Text>Loading...</Text>}
        </>
    )
}

const styles = StyleSheet.create({
})

export default PhonebookBox