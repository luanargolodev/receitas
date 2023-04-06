import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { WebView } from 'react-native-webview'

export function Video({ handleClose, url }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleClose}>
        <Feather name="arrow-left" size={24} color="#fff" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <WebView style={styles.contentView} source={{ uri: url }} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    width: '100%',
    backgroundColor: '#4cbe6c',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 14,
  },
  backText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 14,
  },
  contentView: {
    flex: 1,
    width: '100%',
  },
})
