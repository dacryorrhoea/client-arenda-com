import axios from 'axios';
import { getAccessToken } from '../token';

const serverUrl = 'http://localhost:8000/';

const deleteAd = async (ad) => {
  const access = await getAccessToken()

  return await axios.delete(
    serverUrl + `api/user/manage/ads/${ad.id}/`,
    {headers: {Authorization: `Bearer ${access}`}}
  )
}

const updateAd = async (adId, newAdData) => {
  const access = await getAccessToken()

  return await axios.put(
    serverUrl + `api/user/manage/ads/${adId}/`,
    newAdData,
    {headers: {Authorization: `Bearer ${access}`}}
  )
}

export { deleteAd, updateAd }