import axios from 'axios'
const API_URL = 'https://fast-depths-01924.herokuapp.com/api/v1'

const instance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

const secureInstance = axios.create({
  baseURL: API_URL,
})

secureInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token

  return config
})

export { instance, secureInstance }
