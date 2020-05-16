import axios from 'axios'
const API_URL = 'https://fast-depths-01924.herokuapp.com/api/v1'

export const instance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const secureInstance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: localStorage.token },
})
