/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch, RootState } from './store';

export const local_url = 'http://192.168.1.5:3001'

export interface Phonebook {
  id: number;
  name: string;
  phone: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const AndroidSafeArea = {
    flex: 1,
    paddingTop: Platform.OS === "android" ? ((StatusBar.currentHeight ?? 0) + 16) : 0
  }

  /*
  const fetchPhonebookData = async (keyword: string, sort: string, page: number) => {
    setKeyword(keyword)
    const params: Record<string, string> = {
      keyword: keyword,
      sort: sort,
      page: String(page)
    }

    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await fetch(`${local_url}/api/phonebooks?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const result = await response.json();
      setPhonebooks((prevData) => [...prevData, ...result.phonebooks]);
      setSort(sort)
      setTotalPage(result.pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTimeout(() => {
        fetchPhonebookData('', 'asc', 1); // Retry fetching data
      }, 5000);
    }
  };

  const refreshPhonebookData = async (keyword: string, sort: string, page: number) => {
    setKeyword(keyword)
    const params: Record<string, string> = {
      keyword: keyword,
      sort: sort,
      page: String(page)
    }

    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await fetch(`${local_url}/api/phonebooks?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const result = await response.json();
      setPhonebooks(result.phonebooks);
      setPage(1)
      setTotalPage(result.pages)
      setSort(sort)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const addPhonebook = async (name: string, phone: string) => {
    const newData = {
      name,
      phone
    };
    try {
      const response = await fetch(`${local_url}/api/phonebooks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      const result = await response.json();
      console.log("Data posted successfully:", result);
      refreshPhonebookData(keyword, 'asc', 1)
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  const removePhonebook = async (id: number) => {
    try {
      const response = await fetch(`${local_url}/api/phonebooks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      const result = await response.json();
      console.log("Data removed successfully:", result);
      refreshPhonebookData(keyword, 'asc', 1)
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  const updatePhonebook = async (id: number, name: string, phone: string) => {
    const updateData = {
      name,
      phone
    };

    try {
      const response = await fetch(`${local_url}/api/phonebooks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      const result = await response.json();
      console.log("Data posted successfully:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  const handleFileUpload = async (file: string, id: number) => {

    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('avatar', {
      uri: file,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });
    // console.log(formData._parts)
    try {
      const response = await fetch(`${local_url}/api/phonebooks/${id}/avatar`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();

      await refreshPhonebookData(keyword, 'asc', 1)
      console.log('File uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Fetch data when page, keyword, or sort changes
  useEffect(() => {
    if (page > 1 && page <= totalPage) {
      fetchPhonebookData(keyword, sort, page);
    }
  }, [page, keyword, sort]);

  // Handle scroll event to load more data
  const handleScroll = () => {
    if (page < totalPage) {
      setPage(prevPage => prevPage + 1);
    }
  };

  */

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
