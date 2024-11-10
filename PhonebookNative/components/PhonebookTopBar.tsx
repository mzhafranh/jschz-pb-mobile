import React, {useEffect} from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowDownZA, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
// import PhonebookForm from './PhonebookForm';

export default function PhonebookTopBar(){
    const [keyword, setKeyword] = useState('')
    const sort = 'asc'
    const handleSearchChange = (value: React.SetStateAction<string>) => {
        setKeyword(value)
        // refreshPhonebookData(value, sort, 1)
    };

    const handleSortChange = () => {
        const newSortOrder = sort === 'asc' ? 'desc' : 'asc';
        // refreshPhonebookData(keyword, newSortOrder)
    };

  return (
    <View style={styles.topBar} accessibilityLabel="PhonebookTopBar">
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSortChange} accessibilityLabel="sort" style={styles.sortButton}>
          <FontAwesomeIcon icon={faArrowDownZA} />
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
        {/* <PhonebookForm /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    marginRight: 8,
  },
  sortButton: {
    backgroundColor: '#AF8210',
    padding: 10,
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
});

