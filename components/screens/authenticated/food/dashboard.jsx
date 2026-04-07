import { Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Context } from "../../../../App"
import { useContext } from "react"
import {lightTheme, darkTheme} from "../../../themes"
import { Dimensions } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FoodDashboardScreen({navigation}) {
  const { darkMode } = useContext(Context)
  const categories = [
  {
    id: "starter",
    title: "Entradas",
    icon: <MaterialCommunityIcons name="silverware-fork-knife" size={40}/>
  },
  {
    id: "main_course",
    title: "Pratos principais",
    icon: <FontAwesome5 name="cheese" size={40} />
  },
  {
    id: "dessert",
    title: "Sobremesas",
    icon: <MaterialCommunityIcons name="cupcake" size={40} />
  },
  {
    id: "seafood",
    title: "Frutos do mar",
    icon: <Ionicons name="fish-sharp" size={40} />
  },
  {
    id: "drink",
    title: "Bebidas",
    icon: <FontAwesome5 name="wine-bottle" size={40} />
  },
  {
    id: "bread",
    title: "Pães",
    icon: <FontAwesome5 name="bread-slice" size={40} />
  },
]

  const theme = darkMode ? darkTheme : lightTheme
  
  return (
      <ScrollView style={[styles.container, {backgroundColor: theme.background}]}>
          <FlatList
            data={categories}
            numColumns={2}
            renderItem={({item}) => (
              <TouchableOpacity style={[styles.wrapper]} onPress={() => navigation.navigate("Lista de Comidas", {category: item.id})}>
                <Text style={[styles.title]}>{item.icon}</Text>
                <Text style={[styles.title]}>{item.title}</Text>
              </TouchableOpacity> 
            )}
          />
      </ScrollView>
  );
}

const {width} = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.45,
    minHeight: width * 0.45,
    padding: 20,
    backgroundColor: "#ff4949",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5
  },
  title: {
    textAlign: "center",
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  }
})