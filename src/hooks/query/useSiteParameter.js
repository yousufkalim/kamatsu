import { useQuery } from "react-query"
import { siteApiService } from "../../services/siteService"

export const useGetMaterialDensities = () => {
  const { data, isLoading, error } = useQuery(
    ["useGetMaterialDensities"],
    () => siteApiService.getMaterialDensities(),
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
    materialDensities: data,
    isLoading,
    error
  }
}
