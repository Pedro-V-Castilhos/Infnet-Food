import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = "@session"

export async function saveStorage(session){
  const jsonValue = JSON.stringify(session)
  await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
}

export async function getStorage(){
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
  return jsonValue ? JSON.parse(jsonValue) : []
}