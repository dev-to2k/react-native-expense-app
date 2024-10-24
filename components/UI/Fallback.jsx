import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";

const Fallback = ({
  message = "Something went wrong. Please try again later.",
  containerStyle,
  textStyle,
}) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={[styles.text, textStyle]}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: GlobalStyles.colors.error50,
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
});

export default Fallback;
