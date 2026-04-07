import { Text, View, Switch, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react"
import { Context } from "../../../../App"
import {lightTheme, darkTheme} from "../../../themes"
import {getThemeStorage} from "../../../../storage/themeStorage"

export default function SettingsScreen() {
  const {darkMode, setDarkMode} = useContext(Context)
  const toggleSwitch = () => setDarkMode((prev) => !prev)

  useEffect(() => {
    const loadTheme = async () => {
      const response = await getThemeStorage()
      setDarkMode(response.darkMode)
    }
    loadTheme()
  }, [])

  const theme = darkMode ? darkTheme : lightTheme

  return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
          <View style={[styles.wrapper, {backgroundColor: theme.card}]}>
            <Text style={[styles.title, {color: theme.text}]}>Configurações</Text>
            <View style={styles.switchWrapper}>
              <Text style={[styles.switchLabel, {color: theme.text}]}>Modo escuro:</Text>
              <Switch
                trackColor={{false: '#767577', true: '#fff'}}
                thumbColor={"#ff4949"}
                onValueChange={toggleSwitch}
                value={darkMode}
              />
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    switchLabel: {
        fontWeight: "bold",
        fontSize: 16,
    },
    switchWrapper:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    }
})
