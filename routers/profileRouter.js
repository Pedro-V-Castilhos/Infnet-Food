import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from "../components/screens/authenticated/profile/profile.jsx"
import SettingsScreen from "../components/screens/authenticated/profile/settings.jsx"

const Stack = createStackNavigator()

export default function ProfileStackRouter() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={ProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Configurações" component={SettingsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}