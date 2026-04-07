import { createStackNavigator } from '@react-navigation/stack';
import RestaurantsMapScreen from "../components/screens/authenticated/restaurants/restaurantsMap.jsx"
import RestaurantDetailsScreen from "../components/screens/authenticated/restaurants/details.jsx"

const Stack = createStackNavigator()

export default function RestaurantStackRouter() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Restaurantes" component={RestaurantsMapScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Detalhes" component={RestaurantDetailsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}