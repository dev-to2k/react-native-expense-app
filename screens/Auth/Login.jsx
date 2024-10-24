import { useContext, useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import AuthForm from "../../components/AuthForm";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { GlobalStyles } from "../../constants/style";
import { AuthContext } from "../../contexts/auth";
import { login } from "../../utils/auth-http";

const LoginScreen = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { storeToken } = useContext(AuthContext);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const token = await login(values.email, values.password);
      storeToken(token);
    } catch (error) {
      Alert.alert("Authentication failed", "Could not log in user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return (
    <View style={styles.container}>
      <AuthForm formTitle="Login" buttonTitle="Login" onSubmit={handleSubmit} />
      <Button
        title="Go to Welcome"
        onPress={() => navigation.navigate("Welcome")}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },
});
