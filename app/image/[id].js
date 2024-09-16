import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ImageDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params; // Extract parameters

  // Fetch image data from Redux store
  const image = useSelector((state) =>
    state.images.images.find((img) => img.id.toString() === id)
  );

  if (!image) {
    return (
      <View style={styles.container}>
        <Text>Image not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: image.url }} style={styles.fullImage} />
      <Text style={styles.title}>{image.title}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  fullImage: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default ImageDetailScreen;
