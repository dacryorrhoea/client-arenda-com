import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "../requests/client.user.info"

export function useProfile() {
  const { data, isLoading, isSuccess ,isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserInfo,
    select: data => data.data,
  })

  useEffect(() => {
    if (isSuccess) console.log('Request successful.')
  }, [isSuccess, data])

  useEffect(() => {
    if (isSuccess) console.log('Request error.')
  }, [isError])

  return { data, isLoading, isSuccess ,isError, error }
}