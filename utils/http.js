import axios from "axios";

const API_URL =
  "https://react-native-course-56bda-default-rtdb.asia-southeast1.firebasedatabase.app";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(`${API_URL}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

  const response = await axios.get(`${API_URL}/expenses.json?auth=${token}`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpenseAPI = async (id, expenseData, token) => {
  await axios.put(`${API_URL}/expenses/${id}.json?auth=${token}`, expenseData);
};

export const deleteExpenseAPI = async (id, token) => {
  await axios.delete(`${API_URL}/expenses/${id}.json?auth=${token}`);
};
