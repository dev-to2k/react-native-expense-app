import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { formatDate } from "../../utils/function";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";

const ExpenseForm = ({ onSubmit, isEditingLabel, onCancel, defaultValues }) => {
  const [values, setValues] = useState({
    amount: {
      value: defaultValues?.amount?.toString() || "",
      isValid: true,
    },
    date: {
      value: defaultValues?.date ? formatDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description || "",
      isValid: true,
    },
  });

  const handleChangedInput = (identifier, enteredValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [identifier]: { value: enteredValue, isValid: true },
    }));
  };

  const confirmHandler = () => {
    const expenseData = {
      amount: +values.amount.value,
      date: new Date(
        values.date.value
          ? values.date.value.split("-").reverse().join("-")
          : ""
      ),
      description: values.description.value,
    };

    const isValidAmount = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isValidDate = expenseData.date.toString() !== "Invalid Date";
    const isValidDescription = expenseData.description.trim().length > 0;

    if (!isValidAmount || !isValidDate || !isValidDescription) {
      setValues((prevValues) => ({
        ...prevValues,
        amount: { value: prevValues.amount.value, isValid: isValidAmount },
        date: { value: prevValues.date.value, isValid: isValidDate },
        description: {
          value: prevValues.description.value,
          isValid: isValidDescription,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !values.amount.isValid ||
    !values.date.isValid ||
    !values.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <CustomInput
          style={styles.rowInput}
          label="Amount"
          isInvalid={!values.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: handleChangedInput.bind(this, "amount"),
            value: values.amount.value,
          }}
        />
        <CustomInput
          style={styles.rowInput}
          label="Date"
          isInvalid={!values.date.isValid}
          textInputConfig={{
            placeholder: "DD-MM-YYYY",
            maxLength: 10,
            onChangeText: handleChangedInput.bind(this, "date"),
            value: values.date.value,
          }}
        />
      </View>

      <CustomInput
        label="Description"
        isInvalid={!values.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: handleChangedInput.bind(this, "description"),
          value: values.description.value,
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}

      <View style={styles.buttons}>
        <CustomButton style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </CustomButton>
        <CustomButton style={styles.button} onPress={confirmHandler}>
          {isEditingLabel}
        </CustomButton>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  form: {
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 20,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    marginVertical: 8,
  },
});
