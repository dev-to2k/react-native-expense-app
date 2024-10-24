import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/UI/CustomButton";
import Fallback from "../../components/UI/Fallback";
import { GlobalStyles } from "../../constants/style";
import { fetchPlaceDetails } from "../../utils/database-sqlite";

const PlaceDetails = ({ route, navigation }) => {
  const [fetchedPlace, setFetchedPlace] = useState();

  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
      initialTitle: fetchedPlace.title,
    });
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);

      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return <Fallback message="Loading place data..." />;
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <CustomButton icon="map" onPress={showOnMapHandler} mode="flat">
          <Text style={styles.buttonText}>View on Map</Text>
        </CustomButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: GlobalStyles.colors.primary100,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonText: {
    color: GlobalStyles.colors.primary100,
  },
});
