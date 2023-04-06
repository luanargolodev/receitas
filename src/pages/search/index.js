import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { FoodList } from '../../components/FoodList'

import api from '../../services/api'

export function Search() {
  const route = useRoute()
  const [receipes, setReceipes] = useState([])

  useEffect(() => {
    async function fetchReceipes() {
      const response = await api.get(`/foods?name_like=${route.params?.name}`)
      setReceipes(response.data)
    }

    fetchReceipes()
  }, [route.params?.name])

  return (
    <View style={styles.container}>
      {receipes.length === 0 && (
        <Text style={styles.text}>
          Não encontramos nenhuma receita com esse nome
        </Text>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={receipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <FoodList data={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f9ff',
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
  },
  text: {
    fontSize: 16,
  },
})
