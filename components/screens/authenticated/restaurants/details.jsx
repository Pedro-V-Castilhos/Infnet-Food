import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Context } from "../../../../App";
import { useContext, useState, useEffect } from "react";
import { lightTheme, darkTheme } from "../../../themes";
import { getRestaurantById, getRestaurantMenu } from "../../../../clients/fakeRestaurantClient"
import AntDesign from '@expo/vector-icons/AntDesign';

export default function RestaurantDetailsScreen({ route, navigation }) {
  const { darkMode } = useContext(Context);
  const { restaurantId } = route.params ? route.params : { restaurantId: null };

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true);

  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const resultRestaurant = await getRestaurantById(restaurantId);
        const resultMenu = await getRestaurantMenu(restaurantId)
        setRestaurant(resultRestaurant);
        setMenu(resultMenu)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurant();
  }, [restaurantId]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Carregando...</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Restaurante não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.wrapper, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          {restaurant.restaurantName}
        </Text>
        <Text style={[styles.category, { color: theme.muted, borderColor: theme.muted }]}>
          {restaurant.type}
        </Text>
        <Text style={[styles.field, { color: theme.muted }]}>
          📍 {restaurant.address}
        </Text>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Menu
        </Text>

        {menu && menu.length > 0 ? (
          menu.map((item) => (
            <TouchableOpacity
              key={item.itemID}
              style={[styles.menuItem]}
              onPress={() => {
                navigation.getParent().navigate("Produtos", {screen: "Detalhes", params: {productId: item.itemID}})
              }}
            >
              <View style={styles.menuItemContent}>
                <View>
                  <Text style={[styles.menuName, { color: theme.text }]}>
                    {item.itemName}
                  </Text>
                  <Text style={{ color: theme.muted }}>
                    R$ {item.itemPrice.toFixed(2).replace(".", ",")}
                  </Text>
                </View>
                <AntDesign name="right" size={20} color={theme.muted} />
              </View>

            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: theme.muted }}>Nenhum item disponível</Text>
        )}
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  wrapper: {
    width: width * 0.9,
    alignSelf: "center",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    margin: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  category: {
    alignSelf: "flex-start",
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  field: {
    marginBottom: 10,
    fontSize: 14,
  },
  sectionTitle: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  menuName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  menuItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});