import { AXIOS } from '@/plugins/axios'

export const pliegoService = {
  updatePliego,
  createPliego,
  updatePliegoData,
  getProducto
}

/**
 * Actualiza el estado de un pliego
 * @return {Promise<T>}
 */
function updatePliego (jsonWithRecord) {
  // execute the request
  return AXIOS.post('/pliego/updateEstado', {
    idPliego: jsonWithRecord.idPliego,
    idEstadoPliego: jsonWithRecord.idEstadoPliego
  })
}

function createPliego (objectToCreate) {
  // execute the request
  return AXIOS.post('/pliego/new', objectToCreate)
}
function updatePliegoData (objectToUpdate) {
  // execute the request
  return AXIOS.post('/pliego/update', objectToUpdate)
}
function getProducto (jsonWithRecord) {
  // execute the request
  return AXIOS.get('/pliego/productos', {
    params:{idPliego: jsonWithRecord.idPliego}
    })
}

