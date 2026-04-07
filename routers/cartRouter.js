import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from "../components/screens/authenticated/cart/cart.jsx"
import CheckouScreen from "../components/screens/authenticated/cart/checkout.jsx"

const Stack = createStackNavigator()

export default function CartStackRouter() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Carrinho" component={CartScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Checkout" component={CheckouScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}