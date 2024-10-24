import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";

const LoadingOverlay = ({ message = "" }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  message: {
    fontSize: 16,
    marginTop: 12,
    color: "white",
  },
});
