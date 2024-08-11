import axios from 'axios';
import { receiveData } from './data';

const serverUrl = 'http://localhost:8000/';

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      serverUrl + "api/token/refresh/",
      {
        refresh: receiveData('UserTokenRefresh')
      }
    )
    return response.data.access
  } catch (error) {
    return null
  }
}

export {getAccessToken}
