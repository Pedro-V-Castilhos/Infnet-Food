import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
import { data } from "../../../../mocks/mockFoods"
import { Context } from "../../../../App"
import { useContext } from "react"
import {lightTheme, darkTheme} from "../../../themes"

export default function FoodListScreen({route, navigation}) {
  const { darkMode } = useContext(Context)
  const {category} = route.params ? route.params : {category: null}

  const products = data.items.filter((item) => item.category === category)
  const theme = darkMode ? darkTheme : lightTheme

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
          <FlatList
            data={products}
            numColumns={2}
            renderItem={({item}) => (
              <TouchableOpacity style={[styles.wrapper, {backgroundColor: theme.card}]} onPress={() => navigation.navigate("Detalhes", {productId: item.itemID})}>
                <Image style={[styles.image, {borderColor: theme.text}]} source={{uri: item.imageUrl}}/>
                <Text style={[styles.title, {color: theme.text}]}>{item.itemName}</Text>
                <Text style={[styles.title, {color: theme.muted}]}>R$ {item.itemPrice.toFixed(2).replace(".", ",")}</Text>
              </TouchableOpacity> 
            )}
          />
      </View>
    );
}

const {width} = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.45,
    minHeight: width * 0.45,
    padding: 20,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  image:{
    width: 100,
    height: 100,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: "#fff"
  }
})
