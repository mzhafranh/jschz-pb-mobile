import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import PhonebookBox from '../components/PhonebookBox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

function HomeScreen({}) {
    return(
        <View>
              <PhonebookBox/>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default HomeScreen