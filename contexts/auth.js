import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useReducer } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "STORE_TOKEN":
      return { token: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { token: "", isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    token: "",
    isAuthenticated: false,
  });

  const storeToken = (token) => {
    dispatch({ type: "STORE_TOKEN", payload: token });
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("tokenTimestamp", new Date().getTime().toString());
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("tokenTimestamp");
  };

  return (
    <AuthContext.Provider value={{ authState, storeToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
