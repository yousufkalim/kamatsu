import { request } from "../utils/http"

function getMaterialDensities() {
  return request
    .get(`/hat/material-densities/`)
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log(error)
      throw error
    })
}

function verifySiteParameters(payload) {
  return request
    .post(`/hat/verify/site-parameters/`, payload)
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log(error)
      throw error
    })
}

export const siteApiService = {
  getMaterialDensities,
  verifySiteParameters
}
