import React from 'react';
import { View } from 'react-native';
import PhonebookBox from '../components/PhonebookBox';

function HomeScreen({}) {
  console.log("HomeScreen Rendered");
    return(
        <View>
              <PhonebookBox/>
        </View>
    )
}

export default HomeScreen