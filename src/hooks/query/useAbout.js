import { useQuery } from "react-query"
import { aboutApiService } from "../../services/aboutService"

export const useGetAboutUs = () => {
  const { data, isLoading, error } = useQuery(
    ["useGetAboutUs"],
    () => aboutApiService.getAboutUs(),
    {
      staleTime: 10000
    },
    {
      onError: e => {
        console.error(e)
      },
      refetchInterval: 5000
    }
  )

  return {
    data,
    isLoading,
    error
  }
}
