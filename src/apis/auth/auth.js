import { instance } from '../axios_instance'

export function signIn(email, password) {
  return instance.post('/auth/signin', {
    email: email,
    password: password,
  })
}

export function signUp(username, email, password) {
  return instance.post('/auth/signup', {
    username: username,
    email: email,
    password: password,
  })
}
