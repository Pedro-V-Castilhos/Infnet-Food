import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../components/screens/login.jsx"
import BottomTabsRouter from "./bottomTabsRouter"
import { useState, useEffect } from "react"
import { getStorage } from "../storage/sessionStorage"

const Stack = createStackNavigator()

export default function AppStackRouter() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkInitialAuth = async () => {
      const response = await getStorage();
      setInitialRoute(response?.user ? "Dashboard" : "Login");
    };
    checkInitialAuth();
  }, []);

  if (!initialRoute) return null;

  return (
    <Stack.Navigator initialRoute={initialRoute}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Dashboard" component={BottomTabsRouter} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}