import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Logo } from '../../components/Logo'

export function Home() {
  const [inputValue, setInputValue] = useState('')

  function handleSearch() {
    console.log('Buscar:', inputValue)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <Text style={styles.title}>Encontre a receita</Text>
      <Text style={styles.title}>que combina com você</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Digite o nome da comida"
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={28} color="#4cbe6c" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f9ff',
    paddingTop: 36,
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0e0e0e',
  },
  form: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ececec',
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    maxWidth: '90%',
    width: '90%',
    height: 54,
  },
})
