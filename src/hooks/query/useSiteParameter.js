import { useMutation, useQuery } from "react-query"
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

export const useVerifySiteParameters = () => {
  const { mutateAsync, isLoading, isSuccess } = useMutation(
    payload => siteApiService.verifySiteParameters(payload),
    {
      onSuccess: () => {
        console.log("Verified successfully")
      },
      onError: e => {
        console.error(e)
      }
    }
  )
  return {
    verifySiteParameters: mutateAsync,
    isVerifying: isLoading,
    isSuccess
  }
}
