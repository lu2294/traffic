import axios from '../utils/axios'

export const qryNumberOfIllegalVehList = params =>
  axios.get('api/', { params })