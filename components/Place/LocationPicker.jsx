import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { getAddress, getMapPreview } from "../../utils/location";
import CustomButton from "../UI/CustomButton";

const LocationPicker = ({ onLocationPicked }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };

      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    const getAddressHandler = async () => {
      const address = await getAddress(pickedLocation.lat, pickedLocation.lng);

      onLocationPicked({ ...pickedLocation, address });
    };

    if (pickedLocation) {
      getAddressHandler();
    }
  }, [pickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const pickOnMapHandler = async () => {
    navigation.navigate("Map");
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  let imagePreview = (
    <View style={styles.noLocation}>
      <Text style={styles.noLocationText}>No location picked yet.</Text>
    </View>
  );

  if (pickedLocation) {
    imagePreview = (
      <Image
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
        style={styles.image}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{imagePreview}</View>
      <View style={styles.actions}>
        <CustomButton onPress={getLocationHandler} outline icon="location">
          Locate User
        </CustomButton>
        <CustomButton onPress={pickOnMapHandler} outline icon="map">
          Pick on Map
        </CustomButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
    marginBottom: 100,
  },
  noLocation: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 10,
    padding: 10,
    height: 200,
    width: "100%",
  },
  noLocationText: {
    fontSize: 16,
    color: GlobalStyles.colors.primary700,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
