import React from 'react';
import { View} from 'react-native';
import PhonebookBox from '../components/PhonebookBox';

function HomeScreen({route}) {
    const {phonebooks, page, totalPage, keyword, sort, removePhonebook, updatePhonebook, handleFileUpload, addPhonebook, handleScroll, refreshPhonebookData} = route.params
    return(
        <View>
            <PhonebookBox phonebooks={phonebooks} page={page} totalPage={totalPage} keyword={keyword} sort={sort} removePhonebook={removePhonebook} updatePhonebook={updatePhonebook} handleFileUpload={handleFileUpload} addPhonebook={addPhonebook} handleScroll={handleScroll} refreshPhonebookData={refreshPhonebookData} />
        </View>
    )
}

export default HomeScreen