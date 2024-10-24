import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../../components/ExpensesOutput";
import { ExpensesContext } from "../../contexts/expenses";

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={expenses}
        expensesPeriod="Total"
        fallbackText="No expenses registered found!"
      />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
