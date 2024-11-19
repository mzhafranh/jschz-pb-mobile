import { StyleSheet, View, Text } from "react-native";
import PhonebookTopBar from "./PhonebookTopBar";
import PhonebookList from "./PhonebookList";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react"
import { refreshPhonebookData } from "../slices/phonebookSlice";
import { RootState, AppDispatch } from "../store";

const PhonebookBox = () => {
  const { phonebooks, keyword, sort } = useSelector((state: RootState) => state.phonebookReducer);
  
  const dispatch = useDispatch<AppDispatch>();
  console.log('PbBox Rendered')

  useEffect(() => {
    if (!phonebooks.length) {
      console.log('Fetch in PbBox');
      dispatch(refreshPhonebookData({ keyword, sort, page: 1 }));
    }
  }, []);
    
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