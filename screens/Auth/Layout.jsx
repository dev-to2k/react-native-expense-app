import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";

const AuthLayout = () => {
  return (
    <View style={styles.container}>
      <Text>Auth layout</Text>
    </View>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },
});
