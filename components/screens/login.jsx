import { Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import {useState, useEffect} from "react"
import { users } from "../../mocks/mockUsers";
import { getStorage, saveStorage } from "../../storage/sessionStorage";

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("john.doe@example.com")
  const [password, setPassword] = useState("1234")
  const [error, setError] = useState({email:{message: ""}, password:{message: ""}})

  useEffect(() => {
    const loadStorage = async () => {
      const response = await getStorage()
      if(response && response.user){
        navigation.replace("Dashboard")
      }
    }
    loadStorage()
  }, [])

  async function handleLogin() {
    setError({email:{message: ""}, password:{message: ""}});
    
    if (email && password) {
      const user = users.find((u) => u.email === email && u.password === password);
      
      if (user) {
        const session = { user: user };
        try {
          await saveStorage(session);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          });
        } catch (e) {
          console.error("Erro ao salvar sessão:", e);
        }
      } else {
        setError(
          {
            email:{ message: "Email ou senha inválidos!" }, 
            password:{ message: "Email ou senha inválidos!" }
          }
        );
      }
    } else {
      if (!password) {
          setError((prev) => ({...prev, password:{ message: "Digite sua senha!" }}));
        }
        if (!email) {
          setError((prev) => ({...prev, email:{ message: "Digite seu email!" }}));
        }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginForm}>
        <Text style={styles.formTitle}>Login</Text>
        <Text style={styles.formLabel}>Email:</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Ex: email@exemplo.com"
          value={email}
          onChangeText={(e) => setEmail(e)}
          placeholderTextColor="#666"
        />
        <Text style={styles.formError}>{error.email.message}</Text>
        <Text style={styles.formLabel}>Senha:</Text>
        <TextInput
          style={styles.formInput}
          secureTextEntry
          placeholder="Digite sua senha"
          value={password}
          onChangeText={(e) => setPassword(e)}
          placeholderTextColor="#666"
        />
        <Text style={styles.formError}>{error.password.message}</Text>
        <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
          <Text style={styles.submitButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff4949",
    alignItems: "center",
    justifyContent: "center",
  },
  loginForm: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 400,
    maxWidth: "90%",
    justifyContent: "space-around",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#444",
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  formError: {
    color: "red",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#bb1c1c",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
