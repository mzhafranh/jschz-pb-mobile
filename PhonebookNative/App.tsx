/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowDownZA } from '@fortawesome/free-solid-svg-icons/faArrowDownZA'

import PhonebookBox from './components/PhonebookBox';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const AndroidSafeArea = {
    flex: 1,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight + 16 ) : 0
  }

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.1.5:3001/api/phonebooks/`)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle, AndroidSafeArea]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <PhonebookBox/>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={{paddingLeft:10, paddingRight:10}}
        >
        {data ? <Text>{JSON.stringify(data)}</Text> : <Text>Loading...</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
