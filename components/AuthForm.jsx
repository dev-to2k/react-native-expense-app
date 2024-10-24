import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/style";
import CustomButton from "./UI/CustomButton";
import CustomInput from "./UI/CustomInput";

const AuthForm = ({ formTitle, buttonTitle, onSubmit }) => {
  const navigation = useNavigation();

  const [values, setValues] = useState({
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
    confirmPassword: { value: "", isValid: true },
  });

  const isRegister = formTitle === "Register";

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: { value, isValid: true },
    }));
  };

  const handleSubmit = () => {
    const emailIsValid = values.email.value.includes("@");
    const passwordIsValid = values.password.value.trim().length > 6;
    let formIsValid = emailIsValid && passwordIsValid;

    const updatedValues = {
      email: { value: values.email.value, isValid: emailIsValid },
      password: { value: values.password.value, isValid: passwordIsValid },
    };

    if (isRegister) {
      const confirmPasswordIsValid =
        values.confirmPassword.value === values.password.value;
      formIsValid = formIsValid && confirmPasswordIsValid;
      updatedValues.confirmPassword = {
        value: values.confirmPassword.value,
        isValid: confirmPasswordIsValid,
      };
    }

    if (!formIsValid) {
      setValues((prevState) => ({
        ...prevState,
        ...updatedValues,
      }));
      return;
    }

    const authData = {
      email: values.email.value,
      password: values.password.value,
    };

    onSubmit(authData);
  };

  const handleNavigate = () => {
    if (isRegister) {
      navigation.replace("Login");
    } else {
      navigation.replace("Register");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{formTitle}</Text>
      <View>
        <View style={styles.inputContainer}>
          <CustomInput
            label="Email"
            textInputConfig={{
              keyboardType: "email-address",
              autoCapitalize: "none",
              autoCorrect: false,
              value: values.email.value,
              onChangeText: handleChange.bind(this, "email"),
            }}
            isInvalid={!values.email.isValid}
          />
          {!values.email.isValid && (
            <Text style={styles.errorText}>
              Please enter a valid email address.
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <CustomInput
            label="Password"
            textInputConfig={{
              secureTextEntry: true,
              autoCapitalize: "none",
              autoCorrect: false,
              value: values.password.value,
              onChangeText: handleChange.bind(this, "password"),
            }}
            isInvalid={!values.password.isValid}
          />
          {!values.password.isValid && (
            <Text style={styles.errorText}>
              Password must be at least 6 characters long.
            </Text>
          )}
        </View>
        {isRegister && (
          <View style={styles.inputContainer}>
            <CustomInput
              label="Confirm Password"
              textInputConfig={{
                secureTextEntry: true,
                autoCapitalize: "none",
                autoCorrect: false,
                value: values.confirmPassword.value,
                onChangeText: handleChange.bind(this, "confirmPassword"),
              }}
              isInvalid={!values.confirmPassword.isValid}
            />
            {!values.confirmPassword.isValid && (
              <Text style={styles.errorText}>Passwords do not match.</Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton onPress={handleSubmit}>{buttonTitle}</CustomButton>
        <CustomButton
          style={styles.button}
          mode="flat"
          onPress={handleNavigate}
        >
          {isRegister ? "Login" : "Create Account"}
        </CustomButton>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginTop: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },

  input: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
  },
  buttonsContainer: {
    gap: 16,
    marginHorizontal: 4,
  },

  button: {
    marginTop: 16,
    height: 100,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    marginTop: 8,
  },
});
