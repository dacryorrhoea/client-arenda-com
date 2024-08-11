import './Profile.css';
import { useState, useEffect } from 'react';

import LessorList from './LessorList';
import FavouritesList from './FavouritesList';
import RentorList from './RentorList';
import ReviewsList from './ReviewsList';
import PageDownloadWaiting from '../../components/PageDownloadWaiting';

import { logout } from '../../utils/requests/client.auth';
import { useProfile } from '../../utils/hooks/useProfile';

function Profile() {
  const { isLoading, data } = useProfile()

  if (isLoading) {
    return (
      <PageDownloadWaiting/>
    )
  }
  
  return (
    <div className="profile_wrapper">
      <div className='profile_info_block'>
        {
          data.groups[0] == 1?
          <img src="https://i.pinimg.com/564x/cb/69/09/cb6909a7c9d2e4d6f1d4fa0dc2e5a066.jpg" alt="" className='profile_photo'/>
          :
          <img src="https://i.pinimg.com/564x/14/88/ae/1488ae2bb4c75132b59da6b038e16f21.jpg" alt="" className='profile_photo' />
        }
        <div className='user_info'>
          <p>Имя: {data.first_name}</p>
          <p>Фамилия: {data.last_name}</p>
          <p>Почта: {data.email}</p>
          <p>Является - {data.groups[0] == 2 ? 'Арендатором' : 'Арендодателем'}</p>
        </div>
        <button>Обновить</button>
        <button onClick={logout}>Выйти</button>
      </div>
      {
        data.groups[0] == 1 ?
          <div className='owner_ads_wrapper'>
            <LessorList adsListData={data.owned_ads} />
          </div>
          :
          <>
            <div className='favourites_ads_wrapper'>
              <RentorList reservationsListData={data.owned_reservations} />
            </div>

            <div className='favourites_ads_wrapper'>
              <ReviewsList reviewsListData={data.owned_reviews} />
            </div>

            <div className='favourites_ads_wrapper'>
              <FavouritesList favoritesListData={data.owned_favorites} />
            </div>
          </>
      }
    </div>
  );
}

export default Profile;