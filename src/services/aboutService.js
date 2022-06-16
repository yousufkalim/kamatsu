import { request } from "../utils/http"

function getAboutUs() {
  return request
    .get(`/pages/about-us/`)
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log(error)
      throw error
    })
}

export const aboutApiService = {
  getAboutUs
}
