import { EvilIcons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState, useEffect, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { saveStorage, getStorage } from "../../../../storage/sessionStorage"
import { Context } from "../../../../App"
import {lightTheme, darkTheme} from "../../../themes"

export default function ProfileScreen({navigation}) {
    const {darkMode} = useContext(Context)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    const theme = darkMode ? darkTheme : lightTheme
    
    useEffect(() => {
      setLoading(true)
      const loadUser = async () => {
        const response = await getStorage()
        setUser(response.user)
      }
      loadUser()
      setLoading(false)
    }, [])
    
    return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <View style={[styles.wrapper, {backgroundColor: theme.card}]}>
            <Text style={[styles.title, {color: theme.text}]}>Informações do usuário</Text>
            <Text>
              <Text style={[styles.infoLabel, {color: theme.text}]}>Nome: </Text>
              <Text style={[styles.info, {color: theme.muted}]}>{loading ? "Carregando..." : user?.name}</Text>
            </Text>
            <Text>
              <Text style={[styles.infoLabel, {color: theme.text}]}>Email: </Text>
              <Text style={[styles.info, {color: theme.muted}]}>{loading ? "Carregando..." : user?.email}</Text>
            </Text>
            <View style={styles.passWordContainer}>
                <Text style={[styles.infoLabel, {color: theme.text}]}>
                  Senha: 
                  <Text style={[styles.info, {color: theme.muted}]}>
                    {loading 
                      ? "Carregando..." 
                      : passwordVisible 
                        ? user?.password 
                        : " *".repeat(user?.password?.length || 0)
                    }
                  </Text>
                </Text>
                <Text onPress={() =>setPasswordVisible((prev) => !prev)} style={styles.visibleToggle}> 
                  {passwordVisible 
                    ? <Feather name="eye-off" size={18} color={theme.text}/> 
                    : <Feather name="eye" size={18} color={theme.text}/>
                  }
                </Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <Pressable 
                style={[styles.configurationsButton, {backgroundColor: theme.button}]} 
                onPress={() => navigation.navigate("Configurações")}
              >
                <EvilIcons name="gear" size={24} color={theme.text} />
              </Pressable>
              <Pressable 
                style={[styles.configurationsButton, {backgroundColor: theme.button}]} 
                onPress={async () => {
                  await saveStorage({})
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
                }}
              >
                <MaterialIcons name="logout" size={24} color={theme.text} />
              </Pressable>
            </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    configurationsButton: {
        width: 100,
        marginTop: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        alignItems: "center",
        alignSelf: "center",
    },
    infoLabel: {
        fontWeight: "bold",
        fontSize: 16,
    },
    info: {
        marginBottom: 10,
        color: "#333",
        fontSize: 16,
    },
    passWordContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    visibleToggle: {
        marginLeft: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    }
})
