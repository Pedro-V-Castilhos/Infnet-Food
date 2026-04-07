import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartStackRouter from "./cartRouter"
import FoodStackRouter from "./foodRouter"
import ProfileStackRouter from "./profileRouter"
import RestaurantStackRouter from "./restaurantsRouter"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useState, useEffect} from "react"
import {getStorage} from "../storage/sessionStorage"

const Tabs = createBottomTabNavigator();

export default function BottomTabsRouter({navigation}) {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const handleLogin = async () => {
      const session = await getStorage();
      if (session && session.user) {
        setChecking(false);
      } else {
        navigation.replace("Login");
      }
    };
    handleLogin();
  }, []);

  if (checking) return null;

  return (
    <Tabs.Navigator screenOptions={({route}) =>
      ({ 
        headerShown: false, 
        tabBarActiveBackgroundColor: "#bb1c1c", 
        tabBarInactiveBackgroundColor: "#ff4949", 
        tabBarIconStyle: { color: "#fff" }, 
        tabBarLabelStyle: { color: "#fff" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Produtos') {
            iconName = "food";
          } else if (route.name === 'Carrinho') {
            iconName = "cart";
          } else if (route.name === 'Restaurantes') {
            iconName = "store";
          } else if (route.name === 'Perfil') {
            iconName = "account";
          }

          // Retorna o componente de ícone
          return <MaterialCommunityIcons name={iconName} size={size} color="#fff" />;
        },
        tabBarActiveTintColor: '#bb1c1c', // Cor quando a aba está ativa
        tabBarInactiveTintColor: 'gray',   // Cor quando está inativa
        tabBarStyle: { paddingBottom: 5, height: 60 }, // Estilização da barra
      })
    }>
      <Tabs.Screen name="Produtos" component={FoodStackRouter} />
      <Tabs.Screen name="Carrinho" component={CartStackRouter} />
      <Tabs.Screen name="Restaurantes" component={RestaurantStackRouter} />
      <Tabs.Screen name="Perfil" component={ProfileStackRouter} />
    </Tabs.Navigator>
  );
}