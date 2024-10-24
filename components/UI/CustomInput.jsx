import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/style";

const CustomInput = ({ label, style, textInputConfig, isInvalid }) => {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (isInvalid) {
    inputStyles.push(styles.errorInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, isInvalid && styles.errorLabel]}>
        {label}
      </Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
  errorLabel: {
    color: GlobalStyles.colors.error500,
  },
});
