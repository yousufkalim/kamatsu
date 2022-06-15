import axios from 'axios'

const cbUrl = 'https://komatsu-demo-34942.botics.co/api/v1/'

export const request = axios.create({
  baseURL: cbUrl,
})

request.interceptors.request.use(function (config) {
  // const token = localStorage.getItem('token')

  // console.log('token', token)

  // if (token) {
  //   config.headers.Authorization = `Token ${token}`
  // }

  return config
})

request.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    console.log('errr', error)

    // if (error?.response?.status === 401 || error?.response?.status === 403) {
    //   localStorage.removeItem('token')
    // }
    return Promise.reject(error)
  },
)
