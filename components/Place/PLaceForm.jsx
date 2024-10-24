import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/style";
import Place from "../../models/place";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PLaceForm = ({ onCreatePlace }) => {
  const [title, setTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleImageTaken = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const handleLocationPicked = (location) => {
    setPickedLocation(location);
  };

  const handleSubmit = () => {
    const postData = new Place(title, selectedImage, pickedLocation);
    onCreatePlace(postData);
  };

  return (
    <ScrollView style={styles.form}>
      <View style={styles.inputContainer}>
        <CustomInput
          label="Title"
          textInputConfig={{
            onChangeText: handleTitleChange,
            value: title,
            placeholder: "Enter the title of the place...",
          }}
        />
      </View>
      <ImagePicker onImageTaken={handleImageTaken} />
      <LocationPicker onLocationPicked={handleLocationPicked} />
      <CustomButton onPress={handleSubmit} style={styles.btnSubmit}>
        Add Place
      </CustomButton>
    </ScrollView>
  );
};

export default PLaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  inputContainer: {
    marginVertical: 12,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: GlobalStyles.colors.primary100,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
  },
  btnSubmit: {
    marginTop: -50,
    marginBottom: 100,
  },
});
