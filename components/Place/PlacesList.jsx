import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";
import Fallback from "../UI/Fallback";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  const navigation = useNavigation();

  const selectPlaceHandler = (id) => {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  };

  if (!places || places.length === 0) {
    return <Fallback message="No places found. Start adding some!" />;
  }

  return (
    <FlatList
      data={places}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={() => selectPlaceHandler(item.id)} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PlacesList;
