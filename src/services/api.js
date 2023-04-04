import axios from 'axios'

// Rodar com IPV4: json-server --watch -d 180 --host IP db.json
const api = axios.create({
  baseURL: 'http://192.168.0.106:3000/',
})

export default api
