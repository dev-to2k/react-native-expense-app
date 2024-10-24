import axios from "axios";

const API_URL = "https://identitytoolkit.googleapis.com/v1/accounts";
const API_KEY = "AIzaSyAHcyNwj6SHO0T3LjIET5tzxAnZ-IcqWEE";

const authenticate = async (mode, email, password) => {
  const url = `${API_URL}:${mode}?key=${API_KEY}`;

  try {
    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });

    const token = response.data.idToken;
    return token;
  } catch (error) {
    throw new Error("Authentication failed");
  }
};

export const login = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};

export const register = (email, password) => {
  return authenticate("signUp", email, password);
};
