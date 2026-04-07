import { createStackNavigator } from '@react-navigation/stack';
import FoodDashboardScreen from "../components/screens/authenticated/food/dashboard.jsx"
import FoodListScreen from "../components/screens/authenticated/food/foodList.jsx"
import FoodDetailsScreen from "../components/screens/authenticated/food/details.jsx"

const Stack = createStackNavigator()

export default function FoodStackRouter() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={FoodDashboardScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Lista de Comidas" component={FoodListScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Detalhes" component={FoodDetailsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}