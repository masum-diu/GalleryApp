import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../store";

const GalleryScreen = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.images);
  const status = useSelector((state) => state.images.status);
  const router = useRouter();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchImages());
    }
  }, [status, dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => router.push(`/image/${item.id}`)}>
      <Image
        source={{ uri: item.thumbnailUrl }}
        style={styles.imageThumbnail}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 50,
  },
  imageThumbnail: {
    width: Dimensions.get("window").width / 3 - 10,
    height: Dimensions.get("window").width / 3 - 10,
  },
});

export default GalleryScreen;
