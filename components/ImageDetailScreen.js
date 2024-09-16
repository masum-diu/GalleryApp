// components/ImageDetailScreen.js
import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

const ImageDetailScreen = ({ route, navigation }) => {
  const { image } = route.params;

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
