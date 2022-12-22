import { AXIOS } from '@/plugins/axios'
import pagination from '@/utils/pagination'

export const userService = {
  list,
  getLoggedUser,
  create,
  update,
  modify,
  changePassword,
  deleteUser,
  updateLock,
  updateActivation,
  hasAnyRole
}

/**
 * Returns the list of users in a paginated way
 * @param paginationData the pagination data
 * @return {Promise<T>}
 */
function list (paginationData) {
  return AXIOS.get('/users/all' + pagination.generatePagination(paginationData))
}

/**
 * Returns the info of the logged user
 * @return {Promise<T>}
 */
function getLoggedUser () {
  return AXIOS.get('/users/info')
}

/**
 * Creates a new user
 * @param username the username of the user to be created
 * @param password the password of the user to be created
 * @param email the email of the user to be created
 * @param roleId the role identifier of the user to be created
 * @return {Promise<T>}
 */
function create (username, password, email, roleId) {
  // execute the request
  return AXIOS.post('/users/add', {
    login: username,
    password: password,
    email: email,
    role: {
      roleId: roleId
    }
  })
}

/**
 * Updates an existing user
 * @param userId the user identifier of the user to be updated
 * @param username the username of the user to be updated
 * @param email the email of the user to be updated
 * @param roleId the role identifier of the user to be updated
 * @return {Promise<T>}
 */
function update (userId, username, email, roleId) {
  // execute the request
  return AXIOS.put('/users/update', {
    userId: userId,
    login: username,
    email: email,
    role: {
      roleId: roleId
    }
  })
}

/**
 * Modifies the data of an existing user by himself
 *
 * @param email the new email
 * @param oldPassword the current password
 * @param newPassword the new password
 * @return {Promise<T>}
 */
function modify (email, oldPassword, newPassword) {
  // execute the request
  return AXIOS.put('/users/modify', {
    email: email,
    oldPassword: oldPassword,
    newPassword: newPassword
  })
}

/**
 * Updates the password of the given user
 *
 * @param username the username of the user to be updated
 * @param password the new password for the user
 * @return {Promise<T>}
 */
function changePassword (username, password) {
  // set params
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  // execute the login
  return AXIOS.patch('/users/password', params)
}

/**
 * Deletes an existing user
 *
 * @param userId the identifier of the user to be deleted
 * @return {Promise<T>}
 */
function deleteUser (userId) {
  // execute the login
  return AXIOS.delete('/users/delete/' + userId)
}

/**
 * Lock/unlocks an existing user
 *
 * @param username the username of the user to be locked/unlocked
 * @param lock     marks if the user should be locked (true) or not (false)
 * @return {Promise<T>}
 */
function updateLock (username, lock) {
  // set params
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('lock', lock)
  // execute the login
  return AXIOS.patch('/users/locking', params)
}

/**
 * Activates/deactivates an existing user
 *
 * @param username the username of the user to be activated/deactivated
 * @param activate marks if the user should be activated (true) or deactivated (false)
 * @return {Promise<T>}
 */
function updateActivation (username, activate) {
  // set params
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('activate', activate)
  // execute the login
  return AXIOS.patch('/users/activation', params)
}

/**
 * Checks if the logged user has any of the given roles
 * @param roles the list of roles to be checked
 * @return {Promise<T>}
 */
function hasAnyRole (roles) {
  // serialize the roles
  let params = ''
  let appender = '?'
  roles.forEach(role => {
    params += appender + 'roles=' + role
    appender = '&'
  })
  // execute the rest
  return AXIOS.get('/users/has-role' + params)
}
