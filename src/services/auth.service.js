import { AXIOS } from '@/plugins/axios'

export const authService = {
  authenticate,
  logout
}

// executes the authentication with the given username and password
function authenticate (username, password, takeover) {
  // set params
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  params.append('takeOver', takeover)
  params.append('seed', new Date().getTime().toString())
  // execute the login
  return AXIOS.post('/auth/login', params)
}

// executes the logout for the given username
function logout () {
  return AXIOS.get('/auth/logout')
}
