import axios from "axios"

const cbUrl = "https://komatsu-demo-34942.botics.co/api/v1/"

export const request = axios.create({
  baseURL: cbUrl
})

request.interceptors.request.use(function (config) {
  const token = "9b83d08c90a6b95a4c1a0538ff3183fbc2491547"

  // console.log('token', token)

  if (token) {
    config.headers.Authorization = `Token ${token}`
  }

  return config
})

request.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    console.log("errr", error)

    // if (error?.response?.status === 401 || error?.response?.status === 403) {
    //   localStorage.removeItem('token')
    // }
    return Promise.reject(error)
  }
)

export const request2 = axios.create({
  baseURL: "https://c408-62-8-71-16.ngrok.io/api/v1"
})

request2.interceptors.request.use(function (config) {
  const token = "3a626c25cbc19462e9f57c8707e72ddd93f8876c"

  // console.log('token', token)

  // if (token) {
  //   config.headers.Authorization = `Token ${token}`
  // }

  config.headers.Authorization = "Token " + token

  console.log("config", config)
  return config
})

request2.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    console.log("errr", error)

    // if (error?.response?.status === 401 || error?.response?.status === 403) {
    //   localStorage.removeItem('token')
    // }
    return Promise.reject(error)
  }
)
