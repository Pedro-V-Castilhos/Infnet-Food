import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from "react-native";
import { Context } from "../../../../App"
import { useContext, useState, useEffect } from "react"
import {lightTheme, darkTheme} from "../../../themes"
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function CheckouScreen({navigation}) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState(undefined);

  const { darkMode, cart, setCart } = useContext(Context)
  const [address, setAddress] = useState(null)
  const [selectedValue, setSelectedValue] = useState("");
  const [errors, setErrors] = useState({address: null, paymentMethod: null});

  const theme = darkMode ? darkTheme : lightTheme

  const totalPrice = cart.reduce((sum, item) => sum + item.itemPrice * item.quant, 0)
  const totalQte = cart.reduce((sum, item) => sum + item.quant, 0)

  useFocusEffect(
    useCallback(() => {
      if (cart.length === 0) {
        navigation.navigate("Carrinho");
      }
    }, [cart])
  );

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);
  

  function handleSubmit(){
    setErrors({address: null, paymentMethod: null})

    if(address && selectedValue){
      setCart([])
      navigation.getParent().navigate("Produtos", {screen:"Dashboard"})
    }else{
      if(!address){
        setErrors((prev) => ({...prev, address: "Informe seu endereço!"}))
      }
      if(!selectedValue){
        setErrors((prev) => ({...prev, paymentMethod: "Informe o método de pagamento!"}))
      }
    }
  }

    return (
      <ScrollView style={[styles.container, {backgroundColor: theme.background}]}>
          <View style={[styles.wrapper, {backgroundColor: theme.card}]}>
              <Text style={[styles.title, {color: theme.text}]}>Finalizar Pedido</Text>
              <Text style={[styles.field, {color: theme.muted}]}>
                <Text>Quantidade de itens: </Text>
                <Text>{totalQte}</Text>
              </Text>
              <Text style={[styles.field, {color: theme.muted}]}>
                <Text>Preço Total: </Text>
                <Text>R$ {totalPrice.toFixed(2).replace(".", ",")}</Text>
              </Text>
              <View style={[styles.inputWrapper]}>
                <Text style={[styles.field, {color: theme.muted}]}>Endereço de entrega: </Text>
                <TextInput 
                  style={[styles.formInput]} 
                  placeholder="Rua dos Bobos, 0..." 
                  placeholderTextColor="#666"
                  value={address}
                  onChangeText={(e) => setAddress(e)}
                />
                <Text style={{color: "#ff4949", fontWeight: "bold"}}>{errors.address}</Text>
              </View>
              <View style={[styles.inputWrapper]}>
                <Text style={[styles.field, {color: theme.muted}]}>Modo de pagamento: </Text>
                <Picker
                  style={[styles.formInput]}
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="Selecione..." value="" enabled={false}/>
                  <Picker.Item label="Cartão de Crédito" value="cartão" />
                  <Picker.Item label="Pix" value="pix" />
                  <Picker.Item label="Dinheiro" value="dinheiro" />
                </Picker>
                <Text style={{color: "#ff4949", fontWeight: "bold"}}>{errors.paymentMethod}</Text>
              </View>
              <TouchableOpacity 
                style={[styles.addToCart]} 
                onPress={async () => {
                  await schedulePushNotification(); 
                  handleSubmit()
                }}>
                <Text style={[styles.buttonText]}>Finalizar</Text>
              </TouchableOpacity>
          </View>
      </ScrollView>
    );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Seu pedido foi confirmado!",
      body: 'Dentro de 40min o entregador estará na sua porta para entrega!',
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Deve usar um aparelho para receber notificações!');
  }

  return token;
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
    marginVertical: 10,
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
  },
  field:{
    display: "inline-flex",
    marginVertical: 5,
    fontSize: 16
  },
  inputWrapper:{
    marginVertical: 10
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: "#fff"
  },
})