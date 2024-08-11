import axios from 'axios';
import { getAccessToken } from '../token';

const serverUrl = 'http://localhost:8000/';

const getUserInfo = async () => {
  const access = await getAccessToken()

  return await axios.get(
    serverUrl + "api/account/user/profile/",
    {headers: {Authorization: `Bearer ${access}`}}
  )
}

export { getUserInfo }