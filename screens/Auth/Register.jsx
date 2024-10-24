import { useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import AuthForm from "../../components/AuthForm";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { GlobalStyles } from "../../constants/style";
import { AuthContext } from "../../contexts/auth";
import { register } from "../../utils/auth-http";

const RegisterScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { storeToken } = useContext(AuthContext);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const token = await register(values.email, values.password);
      storeToken(token);
    } catch (error) {
      Alert.alert("Authentication failed", "Could not register user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <View style={styles.container}>
      <AuthForm
        formTitle="Register"
        buttonTitle="Register"
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
