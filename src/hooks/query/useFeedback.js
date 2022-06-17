import { useMutation } from "react-query"
import { feedbackApiService } from "../../services/feedback"

export const useSendFeedback = () => {
  const { mutateAsync, isLoading, isSuccess, } = useMutation(
    payload => feedbackApiService.sendFeedback(payload),
    {
      onSuccess: () => {
        console.log("Feedback added successfully")
      },
      onError: e => {
        console.error(e)
      }
    }
  )
  return {
    sendFeedback: mutateAsync,
    isLoading,
    isSuccess,
  }
}
