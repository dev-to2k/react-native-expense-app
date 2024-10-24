import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";
import CustomButton from "../UI/CustomButton";

const ImagePicker = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const pickImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
    onImageTaken(image.assets[0].uri);
  };

  let imagePreview = (
    <View style={styles.noImageContainer}>
      <Text style={styles.noImageText}>No image selected</Text>
    </View>
  );

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }

  return (
    <View style={styles.imagePicker}>
      <Text style={styles.imagePickerText}>ImagePicker</Text>
      {imagePreview}
      <CustomButton onPress={pickImageHandler} outline icon="camera">
        Take Image
      </CustomButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePicker: {
    marginVertical: 20,
  },
  imagePickerText: {
    fontSize: 12,
    marginBottom: 10,
    color: GlobalStyles.colors.primary100,
  },
  noImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.primary100,
    height: 200,
  },
  noImageText: {
    color: GlobalStyles.colors.primary400,
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 10,
  },
});
