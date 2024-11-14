import React from 'react';
import { View} from 'react-native';
import PhonebookForm from '../components/PhonebookForm';

function FormScreen({route}) {
    const {addPhonebook, keyword, sort} = route.params
    return(
        <View>
            <PhonebookForm addPhonebook={addPhonebook} keyword={keyword} sort={sort}/>
        </View>
    )
}
export default FormScreen