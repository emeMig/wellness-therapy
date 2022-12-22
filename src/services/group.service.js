import { AXIOS } from '@/plugins/axios'
import pagination from '@/utils/pagination'

export const groupService = {
  list,
  create,
  update,
  deleteGroup
}

/**
 * Returns the list of groups in a paginated way
 * @param paginationData the pagination data
 * @return {Promise<T>}
 */
function list (paginationData) {
  // invoke the rest
  return AXIOS.get('/groups/all' + pagination.generatePagination(paginationData))
}

/**
 * Creates a new group
 * @param name the name of the group to be created
 * @param members the members of the group
 * @return {Promise<T>}
 */
function create (name, members) {
  // execute the request
  return AXIOS.post('/groups/add', {
    name: name,
    members: members
  })
}

/**
 * Updates an existing group
 * @param id the identifier of the group to be updated
 * @param name the name of the group to be updated
 * @param members the members of the group
 * @return {Promise<T>}
 */
function update (id, name, members) {
  // execute the request
  return AXIOS.put('/groups/update', {
    groupId: id,
    name: name,
    members: members
  })
}

/**
 * Deletes an existing group
 * @param id the identifier of the group to be updated
 * @return {Promise<T>}
 */
function deleteGroup (id) {
  // execute the request
  return AXIOS.delete('/groups/delete/' + id)
}
