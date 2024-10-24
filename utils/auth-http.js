import axios from "axios";

const authenticate = async (mode, email, password) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}:${mode}?key=${process.env.EXPO_PUBLIC_API_KEY}`;

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
