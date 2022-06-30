import { useMutation, useQuery } from "react-query"
import { fleetApiService } from "../../services/fleetService"

export const useGetLoadingTool = () => {
  const { data, isLoading, error } = useQuery(
    ["useGetLoadingTool"],
    () => fleetApiService.getLoadingTools(),
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
    loadingTools: data,
    isLoading,
    error
  }
}

export const useGetHaulingTool = () => {
  const { data, isLoading, error } = useQuery(
    ["useGetHaulingTool"],
    () => fleetApiService.getHaulingTools(),
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
    haulingTools: data,
    isLoading,
    error
  }
}

export const useVerifyFleetDefinition = () => {
  const { mutateAsync, isLoading, isSuccess } = useMutation(
    payload => fleetApiService.verifyFleetDefinition(payload),
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
    verifyFleetDefinition: mutateAsync,
    isVerifying: isLoading,
    isSuccess
  }
}
