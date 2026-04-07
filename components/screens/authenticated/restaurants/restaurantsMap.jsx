import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Context } from "../../../../App"
import { useContext } from "react"
import {lightTheme, darkTheme} from "../../../themes"
import Entypo from '@expo/vector-icons/Entypo';

export default function RestaurantsMapScreen({navigation}) {
  const { darkMode } = useContext(Context)
  const markers = [
  { id: 4, top: "12%", left: "25%" },
  { id: 6, top: "30%", left: "70%" },
  { id: 10, top: "55%", left: "40%" },
  { id: 11, top: "75%", left: "20%" },
  { id: 12, top: "20%", left: "50%" },
  { id: 16, top: "65%", left: "80%" },
  { id: 18, top: "45%", left: "10%" },
  { id: 20, top: "85%", left: "60%" },
  { id: 25, top: "10%", left: "80%" },
  { id: 28, top: "50%", left: "30%" },
  { id: 29, top: "58%", left: "56%" },
  { id: 30, top: "65%", left: "10%" },
];
  
  const theme = darkMode ? darkTheme : lightTheme
  
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Image 
        style={[styles.image, {borderColor: theme.text}]} 
        source={require("../../../../assets/map.png")}
      />
      {markers.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.marker,
            { top: item.top, left: item.left }
          ]}
          onPress={() => navigation.navigate("Detalhes", { restaurantId: item.id })}
        >
          <Entypo name="location-pin" size={50} color="#bb1c1c" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image:{
    width: width * 0.9,
    height: height * 0.8,
    position: "absolute",
    borderWidth: 1,
    borderStyle: "solid"
  },
  marker: {
    position: "absolute",
    transform: [{ translateX: -10 }, { translateY: -10 }],
    padding: 5,
    borderRadius: 20,
  },
})
