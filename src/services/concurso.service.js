import { AXIOS } from '@/plugins/axios'

export const concursoService = {
  updateConcurso
}

/**
 * Actualiza el estado de un concurso
 * @return {Promise<T>}
 */
function updateConcurso (jsonWithRecord) {
  // execute the request
  return AXIOS.post('/concurso/updateEstado', {
    idConcurso: jsonWithRecord.idConcurso,
    idEstadoConcurso: jsonWithRecord.idEstadoConcurso
  })
}
