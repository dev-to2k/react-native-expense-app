import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import IconButton from "./components/UI/IconButton";
import { GlobalStyles } from "./constants/style";
import { AuthContext, AuthProvider } from "./contexts/auth";
import { ExpensesContextProvider } from "./contexts/expenses";
import LoginScreen from "./screens/Auth/Login";
import RegisterScreen from "./screens/Auth/Register";
import AllExpenses from "./screens/Expense/AllExpenses";
import ManageExpense from "./screens/Expense/ManageExpense";
import RecentExpenses from "./screens/Expense/RecentExpenses";
import AddPlace from "./screens/Place/AddPlace";
import AllPlaces from "./screens/Place/AllPlaces";
import Map from "./screens/Place/Map";
import PlaceDetails from "./screens/Place/PlaceDetails";
import { initDatabase } from "./utils/database-sqlite";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

SplashScreen.preventAutoHideAsync();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
          paddingBottom: 10,
          paddingTop: 10,
          height: 70,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <View style={{ flexDirection: "row" }}>
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("ManageExpense")}
            />
          </View>
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const ExpensesStack = () => {
  return (
    <ExpensesContextProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} />
        <Stack.Screen
          name="ManageExpense"
          component={ManageExpense}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </ExpensesContextProvider>
  );
};

const PlaceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.accent500,
        },
        headerTintColor: "white",
        contentStyle: {
          backgroundColor: GlobalStyles.colors.primary700,
        },
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={({ navigation }) => ({
          title: "Your Favorite Places",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("AddPlace")}
            />
          ),
        })}
      />
      <Stack.Screen name="AddPlace" component={AddPlace} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        drawerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        drawerActiveTintColor: GlobalStyles.colors.accent500,
        drawerInactiveTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="Expenses"
        component={ExpensesStack}
        options={{ drawerLabel: "Expenses" }}
      />
      <Drawer.Screen
        name="Places"
        component={PlaceStack}
        options={{ drawerLabel: "Places" }}
      />
      <Drawer.Screen
        name="Logout"
        options={{
          drawerLabel: "Logout",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="exit" color={color} size={size} />
          ),
          drawerLabelStyle: {
            marginLeft: -20,
          },
        }}
      >
        {() => {
          const { logout } = useContext(AuthContext);

          useEffect(() => {
            logout();
          }, []);

          return null; // Không cần render gì cả
        }}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const [isDatabaseInitialized, setIsDatabaseInitialized] = useState(false);
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const { authState, storeToken, logout } = useContext(AuthContext);

  useEffect(() => {
    const checkToken = async () => {
      setIsTryingLogin(true);
      const token = await AsyncStorage.getItem("token");
      const tokenTimestamp = await AsyncStorage.getItem("tokenTimestamp");

      if (token && tokenTimestamp) {
        const currentTime = new Date().getTime();
        const oneHour = 60 * 60 * 1000;

        if (currentTime - parseInt(tokenTimestamp, 10) > oneHour) {
          logout();
        } else {
          storeToken(token);
        }
      }
      setIsTryingLogin(false);
    };

    checkToken();

    initDatabase()
      .then(() => {
        console.log("Database initialized!");
        setIsDatabaseInitialized(true);
      })
      .catch((error) => {
        console.error("Database initialization failed:", error);
      });
  }, []);

  if (!isTryingLogin && isDatabaseInitialized) {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplashScreen();
  }

  return (
    <NavigationContainer>
      {authState.isAuthenticated ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </>
  );
}
