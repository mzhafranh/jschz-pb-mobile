import React, { useEffect } from "react";
import { View, ScrollView, useColorScheme, NativeSyntheticEvent, NativeScrollEvent, FlatList } from "react-native";
import PhonebookItem from "./PhonebookItem";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchPhonebookData, setPage } from "../slices/phonebookSlice";

// interface PhonebookListProps {
//   phonebooks: Phonebook[];
//   removePhonebook: (id: number) => void;
//   updatePhonebook: (id: number, name: string, phone: string) => void;
//   uploadAvatar: (file: string, id: number) => void;
//   handleScroll: () => void;
// }

const PhonebookList = () => {
  const {phonebooks, page, keyword, sort, totalPage} = useSelector((state: RootState) => state.phonebookReducer);
  const dispatch = useDispatch<AppDispatch>();

  // Fetch data when page, keyword, or sort changes
  useEffect(() => {
    if (page > 1 && page <= totalPage) {
      dispatch(fetchPhonebookData({keyword, sort, page}));
    }
  }, [page, keyword, sort]);

  // Handle scroll event to load more data
  const handleScroll = () => {
    if (page < totalPage) {
      let newPage = page + 1
      dispatch(setPage({newPage}));
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
      onEndReachedThreshold={0.5}
    />
  );
}

export default PhonebookList