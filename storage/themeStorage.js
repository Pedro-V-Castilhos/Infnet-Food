import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = "@theme"

export async function saveThemeStorage(theme){
  const jsonValue = JSON.stringify(theme)
  await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
}

export async function getThemeStorage(){
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
  return jsonValue ? JSON.parse(jsonValue) : []
}