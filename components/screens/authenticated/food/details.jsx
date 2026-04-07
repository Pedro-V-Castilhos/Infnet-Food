import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Context } from "../../../../App"
import { useContext, useState, useEffect } from "react"
import {lightTheme, darkTheme} from "../../../themes"
import { data } from "../../../../mocks/mockFoods"
import { getRestaurantById } from "../../../../clients/fakeRestaurantClient"

export default function FoodDetailsScreen({route}) {
  const { darkMode, cart, setCart } = useContext(Context)
  const { productId } = route.params ? route.params : {productId: null}
  const [restaurant, setRestaurant] = useState(null);

  const product = data.items.find((item) => item.itemID === productId)
  const inCart = cart.find((item) => item.itemID === productId)

  useEffect(() => {
    async function fetchRestaurant() {
      const result = await getRestaurantById(product.restaurantID);
      setRestaurant(result);
    }

    fetchRestaurant();
  }, [product.restaurantID]);

  function addToCart(){
    const prodInCart = cart.find((item) => item.itemID === productId)
    if(prodInCart){
      setCart((prev) => prev.map((item) => item.itemID === productId ? {...item, quant: item.quant + 1} : item))
    }else{
      setCart((prev) => [...prev, {...product, quant: 1}])
    }
  }

  const theme = darkMode ? darkTheme : lightTheme
  
    return (
        <ScrollView style={[styles.container, {backgroundColor: theme.background}]}>
            <View style={[styles.wrapper, {background: theme.card}]}>
              <Image style={[styles.image]} source={{uri: product.imageUrl}}/>
              <Text style={[styles.title, {color: theme.text}]}>
                {product.itemName}
                <Text style={[styles.category, {color: theme.muted, borderColor: theme.muted}]}>
                  {product.category}
                </Text>
              </Text>
              <Text style={[{color: theme.muted}]}>{product.itemDescription}</Text>
              <Text style={[styles.price, {color: theme.text}]}>
                R$ {product.itemPrice.toFixed(2).replace(".", ",")}
              </Text>
              <Text style={[{color: theme.text}]}>
                Oferecido por: {restaurant ? restaurant.restaurantName : "Carregando..."}
              </Text>
              <TouchableOpacity style={[styles.addToCart]} onPress={() => addToCart()}>
                <Text style={[styles.buttonText]}>Adicionar ao carrinho</Text>
              </TouchableOpacity>
              <Text style={[{color: theme.muted, textAlign: "center"}]}>Atualmente no carrinho: {inCart ? inCart.quant : 0}</Text>
            </View>
        </ScrollView>
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
    justifyContent: "space-between",
    width: width * 0.9,
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
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 5,
    fontSize: 32,
    fontWeight: "bold",
  },
  category:{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    margin: 5,
  },
  price:{
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  image:{
    width: "100%",
    height: 200,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: "#fff"
  },
  addToCart:{
    marginVertical: 10,
    backgroundColor: "#ff4949",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  buttonText:{
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
})
