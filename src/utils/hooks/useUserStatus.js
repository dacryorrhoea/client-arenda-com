import { useState } from "react"
import { receiveData } from "../data"


export function useUserStatus() {
  const savedStatus = receiveData('UserStatus') === undefined?'Anon':receiveData('UserStatus');
  const [userStatus, setStatus] = useState(savedStatus)
  
  window.addEventListener('update_user_status', () => {
    setStatus(receiveData('UserStatus'))
  })

  return [ userStatus ]
}