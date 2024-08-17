import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getAddresses = async () => {
  return await axios.get('http://127.0.0.1:8000/api/addresses/')
}

export function useAddresses() {
  const { data, isLoading, isSuccess ,isError, error } = useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses,
    select: data => data.data,
    retry: 2,
  })

  useEffect(() => {
    if (isSuccess) console.log('Request is success')
  }, [isSuccess, data])

  useEffect(() => {
    if (isSuccess) console.log('Request error.')
  }, [isError])

  return { data, isLoading, isSuccess ,isError, error }
}