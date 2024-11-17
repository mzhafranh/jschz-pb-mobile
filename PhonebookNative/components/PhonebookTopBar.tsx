import React, { useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowDownZA, faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PhonebookForm from './PhonebookForm';
import { useNavigation } from '@react-navigation/native';
import FormScreen from '../screens/FormScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from "../store";
import { clearPhonebook, refreshPhonebookData, setKeyword } from '../slices/phonebookSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type FormScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Form'>;

const PhonebookTopBar = () => {
  const navigation = useNavigation<FormScreenNavigationProp>();
  const {keyword, sort} = useSelector((state: RootState) => state.phonebookReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchChange = (value: string) => {
    dispatch(setKeyword(value))
    dispatch(refreshPhonebookData({keyword:value, sort, page:1}))
  };

  const handleSortChange = () => {
    const newSortOrder = sort === 'asc' ? 'desc' : 'asc';
    dispatch(refreshPhonebookData({keyword, sort:newSortOrder, page:1}))
  };

  const goToFormScreen = () => {
    dispatch(clearPhonebook())
    navigation.navigate('Form')
  }

  return (
    <View style={styles.topBar} accessibilityLabel="PhonebookTopBar">
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSortChange} accessibilityLabel="sort" style={styles.sortButton}>
          <FontAwesomeIcon icon={faArrowDownZA} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer} accessibilityLabel="search">
        <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={keyword}
          onChangeText={handleSearchChange}
          placeholder="Search"
        />
      </View>
      <View style={styles.formContainer}>
        <TouchableOpacity onPress={goToFormScreen} style={styles.addButton}>
          <FontAwesomeIcon icon={faUserPlus} size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonContainer: {
    marginRight: 8,
  },
  sortButton: {
    padding: 10,
    backgroundColor: '#AF8210',
    borderRadius: 5,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    paddingHorizontal: 8,
    marginHorizontal: 8,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    borderLeftWidth: 0,
    paddingHorizontal: 5,
  },
  formContainer: {
    marginLeft: 8,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#AF8210',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PhonebookTopBar

