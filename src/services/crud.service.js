import { AXIOS } from '@/plugins/axios'

export default {

  /**
   * Gets all the elements of the table
   * @param {*} tableName Name of the table to with
   * @returns The list of elements
   */
  list: (tableName, queryFilter) => AXIOS.get(`/crud/list/${tableName}` ,{ params:{ queryFilter: queryFilter}}),

  /**
   * Gets all the elements of the table
   * @param {*} tableName Name of the table to with
   * @returns The list of elements
   */
  all: (tableName) => AXIOS.get(`/crud/all/${ tableName }`),

  /**
   * Gets total elements
   * @param {*} tableName Name of the table to with
   * @returns The list of elements
   */
  count: (tableName,queryFilter) => AXIOS.get(`/crud/count/${tableName}`,{ params:{ queryFilter: queryFilter}} ),

  /**
   * Gets the element of the table with the given id
   * @param {*} tableName
   * @param {*} id
   * @returns The element requested
   */
  getById: (tableName, id) =>
    AXIOS.get(`/crud/byId/${tableName}/${id}`),

  /**
   * Inserts in the indicated table the object passed
   * @param {*} tableName
   * @param {*} objectToInsert
   * @returns The object inserted
   */
  insert: (tableName, objectToInsert) =>
    AXIOS.post(`/crud/new/${ tableName }`, objectToInsert),

  /**
   * Updates in the indicated table the object passed
   * @param {*} tableName
   * @param {*} objectToUpdate
   * @returns The object modified
   */
  update: (tableName, objectToUpdate) =>
    AXIOS.post(`/crud/update/${tableName}`, objectToUpdate),

  /**
   * Deletes in the indicated table the object passed
   * @param {*} tableName
   * @param {*} objectToDelete
   * @returns
   */
  delete: (tableName, objectToDelete) =>
    AXIOS.delete(`/crud/delete/${ tableName }`, objectToDelete),

  /**
   * Deletes in the indicated table the object with the id passed
   * @param {*} tableName
   * @param {*} id
   * @returns
   */
  deleteById: (tableName, id) =>
    AXIOS.delete(`/crud/byId/${ tableName }/${ id }`),

};
