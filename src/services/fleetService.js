import { request } from "../utils/http"

function getLoadingTools() {
  return request
    .get(`/hat/loading-tools/`)
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log(error)
      throw error
    })
}

function getHaulingTools() {
  return request
    .get(`/hat/hauling-tools/`)
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log(error)
      throw error
    })
}

export const fleetApiService = {
  getLoadingTools,
  getHaulingTools
}
