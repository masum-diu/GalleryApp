import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchImages } from "../redux/slices/imageSlice"; // Adjust the import path as necessary

const GalleryScreen = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.images);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchImages()); // Fetch images on mount
  }, [dispatch]);

  // Filter images based on search term
  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render each image
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by title..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <FlatList
        data={filteredImages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          // Load more images when scrolled to the end
          dispatch(fetchImages());
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default GalleryScreen;
