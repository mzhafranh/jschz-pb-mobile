import { StyleSheet, View, Text, useColorScheme } from "react-native";
import PhonebookTopBar from "./PhonebookTopBar";
import { ScrollView } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import PhonebookList from "./PhonebookList";

export default function PhonebookBox({phonebooks, page, totalPage, keyword, sort, removePhonebook, updatePhonebook, handleFileUpload, addPhonebook, handleScroll}) {

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      };
    
    console.log(phonebooks)
    
    return (
        <View>
            <View>
            <PhonebookTopBar sort={sort} keyword={keyword} add={addPhonebook} />
            </View>
            {phonebooks ? <PhonebookList data={phonebooks} removePhonebook={removePhonebook} updatePhonebook={updatePhonebook} uploadAvatar={handleFileUpload} handleScroll={handleScroll}/>  : <Text>Loading...</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
})