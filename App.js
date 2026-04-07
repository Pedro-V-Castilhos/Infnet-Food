import { NavigationContainer } from '@react-navigation/native';
import {createContext, useState, useEffect} from "react"
import AppStackRouter from "./routers/appRouter"
import {saveThemeStorage, getThemeStorage} from "./storage/themeStorage"


export const Context = createContext()

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    const loadTheme = async () => {
      const response = await getThemeStorage();
      if (response && typeof response.darkMode === 'boolean') {
        setDarkMode(response.darkMode);
      }
      setIsLoaded(true);
    };
    loadTheme();
  }, []);

  useEffect(() => {
    if (isLoaded) { 
      const saveTheme = async () => {
        await saveThemeStorage({ darkMode: darkMode });
      };
      saveTheme();
    }
  }, [darkMode, isLoaded]);

  if (!isLoaded) return null;

  return(
    <Context.Provider value={{darkMode, setDarkMode, cart, setCart}}>
      <NavigationContainer>
        <AppStackRouter/>
      </NavigationContainer>
    </Context.Provider>
  );
}
