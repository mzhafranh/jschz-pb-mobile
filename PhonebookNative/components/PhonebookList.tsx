import React, { useEffect, useState } from "react";
import { View, ScrollView, useColorScheme, NativeSyntheticEvent, NativeScrollEvent, FlatList } from "react-native";
import PhonebookItem from "./PhonebookItem";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchPhonebookData, refreshPhonebookData, setLoading, setPage } from "../slices/phonebookSlice";
import { useNavigation } from "@react-navigation/native";

const PhonebookList = () => {
  const {phonebooks, page, keyword, sort, totalPage} = useSelector((state: RootState) => state.phonebookReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("useEffect triggered because 'keyword' changed:", keyword);
  }, [keyword]);

  useEffect(() => {
    console.log("useEffect triggered because 'page' changed:", page);
  }, [page]);

  useEffect(() => {
    console.log("useEffect triggered because 'sort' changed:", sort);
  }, [sort]);

  // Fetch data when page, keyword, or sort changes
  useEffect(() => {
    console.log('sampai fetch scroll', isFetching)
    if (page > 1 && page <= totalPage && hasScrolled && isFetching) {
      dispatch(fetchPhonebookData({keyword, sort, page}))
      .finally(() => setIsFetching(false));
    }
  }, [page, keyword, sort]);

   // Reset scroll state when screen gains focus
   useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log('sampai focus')
      console.log('hasScrolled', hasScrolled)
      dispatch(setPage(1));
      setIsFetching(false)
      setHasScrolled(false); // Reset scrolling state on screen focus
    });
    return unsubscribe;
  }, [navigation]);

  // Handle scroll event to load more data
  const handleScroll = () => {
    if (page < totalPage && hasScrolled && !isFetching) {
      console.log('sampai scroll')
      console.log(page, totalPage)
      setIsFetching(true)
      dispatch(setPage(page + 1));
    }
  };

  return (
    <FlatList
      data={phonebooks}
      renderItem={({ item }) => (
        <PhonebookItem
          id={item.id}
          avatar={item.avatar || 'null'}
          name={item.name}
          phone={item.phone}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 80 }}
      onEndReached={handleScroll}
      onEndReachedThreshold={0.25}
      onScroll={() => setHasScrolled(true)}
    />
  );
}

export default PhonebookList