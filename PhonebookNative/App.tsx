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
  ActivityIndicator
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowDownZA } from '@fortawesome/free-solid-svg-icons/faArrowDownZA'

import PhonebookBox from './components/PhonebookBox';

export const local_url = 'http://192.168.1.34:3001'

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const AndroidSafeArea = {
    flex: 1,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight + 16) : 0
  }

  const [phonebooks, setPhonebooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1)
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('asc')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhonebookData('','asc',1)
  }, []);


  const fetchPhonebookData = async (keyword: string, sort: string, page: any) => {
    setKeyword(keyword)
    const params = {
      keyword,
      sort,
      page
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
        fetchPhonebookData('','asc',1); // Retry fetching data
      }, 5000);
    }
  };

  const refreshPhonebookData = async (keyword: string, sort: string, page: any) => {
    setKeyword(keyword)
    const params = {
      keyword,
      sort,
      page
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

  const addPhonebook = async (name: any, phone: any) => {
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

  const removePhonebook = async (id: any) => {
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

  const updatePhonebook = async (id: any, name: any, phone: any) => {
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

  const handleFileUpload = async (file: any, id: any) => {

    if (!file) {
      return;
    }
    // Create FormData object and append the file
    const formData = new FormData();
    formData.append('avatar', {
      uri: file,
      type: 'image/jpeg', // Adjust the MIME type based on your file (could be 'image/png', etc.)
      name: 'avatar.jpg', // Adjust the name based on your file's extension
    }); // 'file' is the key used in the server
    try {
      const response = await fetch(`${local_url}/api/phonebooks/${id}/avatar`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();

      refreshPhonebookData(keyword, 'asc', 1)
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
  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const viewportHeight = event.nativeEvent.layoutMeasurement.height;

    if (contentOffsetY + viewportHeight >= contentHeight - 200 && !loading) {
      // Trigger the next page fetch when near the bottom
      if (page < totalPage) {
        setPage(prevPage => prevPage + 1);
      }
    }
  };
  return (
    <SafeAreaView style={[backgroundStyle, AndroidSafeArea]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#CCC" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <PhonebookBox phonebooks={phonebooks} page={page} totalPage={totalPage} keyword={keyword} sort={sort} removePhonebook={removePhonebook} updatePhonebook={updatePhonebook} handleFileUpload={handleFileUpload} addPhonebook={addPhonebook} handleScroll={handleScroll} refreshPhonebookData={refreshPhonebookData} />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
