import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getFavorites() {
  const favorites = await AsyncStorage.getItem('@appreceitas')
  return JSON.parse(favorites) || []
}

export async function saveFavorite(item) {
  let myFavorites = await getFavorites('@appreceitas')
  let hasItem = myFavorites.some((favorite) => favorite.id === item.id)

  if (hasItem) {
    console.log('ESSE ITEM JÁ ESTÁ SALVO NA SUA LISTA')
    return
  }

  myFavorites.push(item)
  await AsyncStorage.setItem('@appreceitas', JSON.stringify(myFavorites))
  console.log('SALVO COM SUCESSO')
}

export async function removeFavorite(id) {
  let favorites = await getFavorites('@appreceitas')
  let myFavorites = favorites.filter((item) => {
    return item.id !== id
  })

  await AsyncStorage.setItem('@appreceitas', JSON.stringify(myFavorites))
  console.log('ITEM DELETADO COM SUCESSO')
  return myFavorites
}

export async function isFavorite(item) {
  let favorites = await getFavorites('@appreceitas')
  const hasItem = favorites.find((favorite) => favorite.id === item.id)

  if (hasItem) {
    return true
  }

  return false
}
