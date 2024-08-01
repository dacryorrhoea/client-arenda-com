import './Profile.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

import LessorList from './LessorList';
import FavouritesList from './FavouritesList';
import RentorList from './RentorList';

import { getAccessToken } from '../../utils/requests';

const serverUrl = 'http://localhost:8000/'

function Profile({ userInfo, updateUserInfo }) {
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [profileData, setProfileData] = useState()

  useEffect(() => {
    getAccessToken(getProfileData, userInfo.refresh_token)
  }, [])

  const logout = () => {
    axios.post(serverUrl + "api/account/logout/", {
      refresh: userInfo.refresh_token
    })
      .then((res) => {
        updateUserInfo(null);
      })
      .catch(err => console.error(err));
  }

  const getProfileData = (access_token) => {
    axios
      .get(serverUrl + 'api/account/user/profile/', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then((res) => {
        setProfileData(res.data)
        setLoadingStatus(true)
      })
      .catch(err => console.error(err));
  }

  if (!loadingStatus) {
    return (
      <div className="profile_wrapper">
        LOADING
      </div>
    )
  }
  
  return (
    <div className="profile_wrapper">
      <div className='profile_info_block'>
        <img src="https://rule34.xxx//samples/894/sample_a4e77573d6936caa08a0f70501009f06.jpg?10777390" alt="" className='profile_photo' />
        <div className='user_info'>
          <p>Имя: {profileData.first_name}</p>
          <p>Фамилия: {profileData.last_name}</p>
          <p>Почта: {profileData.email}</p>
          <p>Является - {profileData.groups[0] == 1 ? 'Арендатором' : 'Арендодателем'}</p>
        </div>
        <button>Обновить</button>
        <button onClick={logout}>Выйти</button>
      </div>
      {
        userInfo.lessor_rule ?
          <div className='owner_ads_wrapper'>
            <LessorList adsListData={profileData.owned_ads} />
          </div>
          :
          <>
            <div className='favourites_ads_wrapper'>
              <RentorList reservationsListData={profileData.owned_reservations} />
            </div>

            <div className='favourites_ads_wrapper'>
              <FavouritesList userInfo={userInfo} />
            </div>
          </>
      }
    </div>
  );
}

export default Profile;