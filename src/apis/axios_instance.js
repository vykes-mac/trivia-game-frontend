import axios from 'axios'
const API_URL = `${process.env.API_ENDPOINT}`
export const instance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const secureInstance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: localStorage.token },
})
