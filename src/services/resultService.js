import { request } from "../utils/http"

function resultPreview(payload) {
  return request
    .post(`/hat/result-preview/`, payload)
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log(error)
      throw error
    })
}

export const resultsApiService = {
  resultPreview
}
