import { useMutation } from "react-query"
import { resultsApiService } from "../../services/resultService"

export const useResultPreview = () => {
  const { mutateAsync, isLoading, isSuccess, data } = useMutation(
    payload => resultsApiService.resultPreview(payload),
    {
      onSuccess: () => {
        console.log("Results added successfully")
      },
      onError: e => {
        console.error(e)
      }
    }
  )
  return {
    resultPreview: mutateAsync,
    isLoading,
    isSuccess,
    data
  }
}
