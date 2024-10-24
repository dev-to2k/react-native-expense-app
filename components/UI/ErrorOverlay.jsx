import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";

const ErrorOverlay = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>An error occurred!</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  message: {
    fontSize: 14,
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    marginTop: 8,
  },
});
