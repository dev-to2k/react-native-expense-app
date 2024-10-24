import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import PlacesList from "../../components/Place/PlacesList";
import { fetchPlaces } from "../../utils/database-sqlite";

const AllPlaces = ({ route }) => {
  const [places, setPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setPlaces(places);
    };

    if (isFocused) {
      loadPlaces();
    }
  }, [route, isFocused]);

  return <PlacesList places={places} />;
};

export default AllPlaces;
