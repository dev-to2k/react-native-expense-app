import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";

const PlaceItem = ({ place, onSelect }) => (
  <Pressable
    onPress={onSelect.bind(this, place.id)}
    style={({ pressed }) => [styles.item, pressed && styles.pressed]}
  >
    <Image source={{ uri: place.imageUri }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{place.title}</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Address:</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </View>
  </Pressable>
);

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 10,
    marginVertical: 12,
    marginHorizontal: 24,
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    height: 100,
  },
  info: {
    flex: 2,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: GlobalStyles.colors.error50,
  },
  address: {
    fontSize: 12,
    color: GlobalStyles.colors.primary50,
  },
  addressContainer: {
    alignItems: "start",
    marginTop: 12,
  },
  addressTitle: {
    fontSize: 12,
    color: GlobalStyles.colors.primary50,
    marginRight: 4,
    fontWeight: "bold",
  },
});
