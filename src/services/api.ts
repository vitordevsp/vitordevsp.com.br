import axios from 'axios'

// TODO: o baseURL não pode ser localhost pq em prod vai dar merda
export const api = axios.create({
  baseURL: 'api',
})
