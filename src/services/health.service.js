import { AXIOS } from '@/plugins/axios'

export const healthService = {
  checkHealth
}

/**
 * Checks the health of the backend
 * @return {Promise<AxiosResponse<T>>}
 */
function checkHealth () {
  return AXIOS.get('/health/validate')
}
