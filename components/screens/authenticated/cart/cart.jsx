import { Link } from "expo-router";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Context } from "../../../../App"
import { useContext } from "react"
import {lightTheme, darkTheme} from "../../../themes"
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function CartScreen({navigation}) {
  const { darkMode, cart, setCart } = useContext(Context)

  const theme = darkMode ? darkTheme : lightTheme

  const totalPrice = cart.reduce((sum, item) => sum + item.itemPrice * item.quant, 0)

  function increment(item){
    setCart(
      (prev) => prev.map(
        (prod) => prod.itemID === item.itemID ? {...prod, quant: prod.quant + 1} : prod
        )
      )
  }

  function decrement(item){
    if (item.quant === 1){
      deleteItem(item)
      return
    }
    setCart(
      (prev) => prev.map(
        (prod) => prod.itemID === item.itemID ? {...prod, quant: prod.quant - 1} : prod
        )
      )
  }

  function deleteItem(item){
    setCart((prev) => prev.filter((prod) => prod.itemID != item.itemID))
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <FlatList
        contentContainerStyle={{flexGrow: 1, justifyContent: "center"}}
        data={cart}
        ListEmptyComponent={
          <Text style={[styles.title, {color: theme.muted, textAlign: "center"}]}>
            Ops! Parece que você ainda não adicionou nenhum item ao carrinho!
          </Text>
        }
        renderItem={({item}) => (
          <View style={[styles.wrapper, {backgroundColor: theme.card}]}>
            <View style={styles.infoWrapper}>
              <Image style={[styles.image, {borderColor: theme.text}]} source={{uri: item.imageUrl}}/>
              <View style={[styles.info]}>
                <Text numberOfLines={2} style={[styles.title, {color: theme.text}]}>{item.itemName}</Text>
                <Text style={[{color: theme.muted}]}>Quantidade: {item.quant}</Text>
              </View>
            </View>
            <View style={[styles.optGroup]}>
              <TouchableOpacity style={[styles.plusMinus, {backgroundColor: theme.button}]} onPress={() => decrement(item)}>
                <AntDesign name="minus" size={16} color={theme.text} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.plusMinus, {backgroundColor: theme.button}]} onPress={() => increment(item)}>
                <AntDesign name="plus" size={16} color={theme.text}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.del]} onPress={() => deleteItem(item)}>
                <FontAwesome5 name="trash" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={[styles.totalPrice, {borderColor: theme.text, backgroundColor: theme.button, color: theme.text}]}>
        <Text>Preço total: </Text>
        <Text style={styles.price}>R$ {totalPrice.toFixed(2).replace(".", ",")}</Text>
      </Text>
      <TouchableOpacity style={[styles.confirmBtn]} onPress={() => totalPrice && navigation.navigate("Checkout")}>
        <Text style={[styles.confirmBtnText]}>Finalizar compra</Text>
      </TouchableOpacity>
    </View>
  );
}

const {width} = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.9,
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
  infoWrapper:{
    flexDirection: "row",
    flex: 1,          
    minWidth: 0,      
    alignItems: "center",
    gap: 10
  },
  info:{
    flexShrink: 1,
  },
  title: {
    flexShrink: 1,
    textAlign: "left",
    marginVertical: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  image:{
    width: 60,
    height: 60,
    borderWidth: 1,
    borderStyle: "solid"
  },
  optGroup:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 5,
    flexShrink: 0, 
  },
  plusMinus:{
    padding: 5
  },
  del:{
    alignSelf:"flex-start",
    backgroundColor: "#ff4949",
    padding: 10,
    borderRadius: 5
  },
  totalPrice:{
    margin: 5,
    display: "flex",
    justifyContent: "space-between",
    width: width * 0.9,
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid"
  },
  confirmBtn:{
    padding: 10,
    width: width * 0.9,
    borderRadius: 5,
    backgroundColor: "#ff4949",
  },
  confirmBtnText:{
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  }
})
