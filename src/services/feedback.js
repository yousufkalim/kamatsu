import { request } from "../utils/http"

function sendFeedback(payload) {
  return request
    .post(`/feedbacks/customer-feedbacks/`, payload)
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log(error)
      throw error
    })
}

export const feedbackApiService = {
  sendFeedback
}
