import { useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../../components/ExpensesOutput";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { AuthContext } from "../../contexts/auth";
import { ExpensesContext } from "../../contexts/expenses";
import { getDateMinusDays, getStartOfDay } from "../../utils/function";
import { fetchExpenses } from "../../utils/http";

const RecentExpenses = () => {
  const { authState } = useContext(AuthContext);
  const { expenses, setExpenses } = useContext(ExpensesContext);

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses(authState.token);
        setExpenses(expenses);
      } catch (err) {
        setError(
          "An error occurred while loading expense data. Please try again later."
        );
      } finally {
        setIsFetching(false);
      }
    };

    getExpenses();
  }, []);

  const recentExpenses = useMemo(() => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    const todayTimestamp = getStartOfDay(today);
    const date7DaysAgoTimestamp = getStartOfDay(date7DaysAgo);

    return expenses.filter((expense) => {
      const expenseTimestamp = getStartOfDay(expense.date);

      return (
        expenseTimestamp >= date7DaysAgoTimestamp &&
        expenseTimestamp <= todayTimestamp
      );
    });
  }, [expenses]);

  if (isFetching) {
    return <LoadingOverlay message="Fetching expenses..." />;
  }

  if (!isFetching && error) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 days"
        fallbackText="No expenses found in last 7 days."
      />
    </View>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
