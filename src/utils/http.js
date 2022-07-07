import axios from "axios"

const cbUrl = "https://komatsu-demo-34942.botics.co/api/v1/"

export const request = axios.create({
  baseURL: cbUrl
})

request.interceptors.request.use(function (config) {
  return config
})

request.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {

    return Promise.reject(error)
  }
)
