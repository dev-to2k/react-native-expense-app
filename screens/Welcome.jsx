import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/style";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/expense.png")} style={styles.image} />
      <Text style={[styles.textBase, styles.title]}>
        Welcome to Expense Tracker
      </Text>
      <Text style={[styles.textBase, styles.subtitle]}>
        Manage your expenses efficiently
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("ExpensesOverview")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: GlobalStyles.colors.buttonBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: GlobalStyles.colors.white,
    fontSize: 16,
  },
  textBase: {
    color: GlobalStyles.colors.white,
  },
});
