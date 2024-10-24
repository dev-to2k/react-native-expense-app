import React from "react";
import PLaceForm from "../../components/Place/PLaceForm";
import { insertPlace } from "../../utils/database-sqlite";

const AddPlace = ({ navigation }) => {
  const onCreatePlace = async (place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  };

  return <PLaceForm onCreatePlace={onCreatePlace} />;
};

export default AddPlace;
