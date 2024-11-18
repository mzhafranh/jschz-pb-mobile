/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Platform,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';
import { Provider } from 'react-redux';
import store from './store';

export const local_url = 'http://192.168.1.5:3001'

export type RootStackParamList = {
  Home: undefined;
  Form: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const AndroidSafeArea = {
    flex: 1,
    paddingTop: Platform.OS === "android" ? ((StatusBar.currentHeight ?? 0) + 16) : 0
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={[backgroundStyle, AndroidSafeArea]}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, animation: "none" }} />
              <Stack.Screen name="Form" component={FormScreen} options={{ headerShown: false, animation: "none" }} />
            </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
