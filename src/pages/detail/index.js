import { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

export function Detail() {
  const route = useRoute()
  const navigation = useNavigation()
  const [isFavorite, setIsFavorite] = useState(false)

  function handleFavorite() {
    setIsFavorite(!isFavorite)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.data
        ? route.params?.data.name
        : 'Detalhes da receita',
      headerRight: () => (
        <Pressable onPress={handleFavorite}>
          <Entypo
            name={isFavorite ? 'heart' : 'heart-outlined'}
            size={24}
            color="red"
          />
        </Pressable>
      ),
    })
  }, [navigation, route.params?.data, isFavorite])

  return (
    <View style={styles.container}>
      <Text>{route.params?.data.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  },
})
