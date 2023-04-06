import { useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Modal,
  Share,
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'

import { Ingredients } from '../../components/Ingredients'
import { Instructions } from '../../components/Instructions'
import { Video } from '../../components/Video'

import { isFavorite, saveFavorite, removeFavorite } from '../../utils/storage'

export function Detail() {
  const route = useRoute()
  const navigation = useNavigation()
  const [favorite, setIsFavorite] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useLayoutEffect(() => {
    async function getStatusFavorites() {
      const status = await isFavorite(route.params?.data)
      setIsFavorite(status)
    }

    getStatusFavorites()

    navigation.setOptions({
      title: route.params?.data
        ? route.params?.data.name
        : 'Detalhes da receita',
      headerRight: () => (
        <Pressable onPress={() => handleFavorite(route.params?.data)}>
          {favorite ? (
            <Entypo name={'heart'} size={24} color="red" />
          ) : (
            <Entypo name={'heart-outlined'} size={24} color="red" />
          )}
        </Pressable>
      ),
    })
  }, [navigation, route.params?.data, favorite])

  async function handleFavorite(receipe) {
    if (favorite) {
      await removeFavorite(receipe.id)
      setIsFavorite(false)
    } else {
      await saveFavorite(receipe)
      setIsFavorite(true)
    }
  }

  function handleOpenVideo() {
    setIsModalVisible(!isModalVisible)
  }

  async function shareReceipe() {
    try {
      await Share.share({
        url: route.params?.data.video,
        message: `Olha essa receita que eu encontrei: ${route.params?.data.name}`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 14 }}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={handleOpenVideo}>
        <View style={styles.playIcon}>
          <AntDesign name="playcircleo" size={48} color="#fafafa" />
        </View>
        <Image
          source={{ uri: route.params?.data.cover }}
          style={styles.cover}
        />
      </Pressable>

      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.title}>{route.params?.data.name}</Text>
          <Text style={styles.ingredientsText}>
            {route.params?.data.total_ingredients} ingredientes
          </Text>
        </View>
        <Pressable onPress={shareReceipe}>
          <Feather name="share-2" size={24} color="#121212" />
        </Pressable>
      </View>

      {route.params?.data.ingredients.map((item) => (
        <Ingredients key={item.id} data={item} />
      ))}

      <View style={styles.instructionsArea}>
        <Text style={styles.instructionsText}>Modo de preparo</Text>
      </View>

      {route.params?.data.instructions.map((item, index) => (
        <Instructions key={item.id} data={item} index={index} />
      ))}

      <Modal visible={isModalVisible} animationType="slide">
        <Video
          handleClose={() => setIsModalVisible(!isModalVisible)}
          url={route.params?.data.video}
        />
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f9ff',
    paddingTop: 14,
    paddingEnd: 14,
    paddingStart: 14,
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 14,
  },
  playIcon: {
    position: 'absolute',
    zIndex: 9,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    marginTop: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  ingredientsText: {
    marginBottom: 14,
    fontSize: 14,
  },
  instructionsArea: {
    backgroundColor: '#4cbe6c',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 4,
    marginBottom: 14,
  },
  instructionsText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 500,
    marginRight: 8,
  },
})
