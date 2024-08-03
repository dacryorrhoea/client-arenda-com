import { useState, useEffect } from 'react';
import axios from 'axios';
import { Map, Placemark } from '@pbe/react-yandex-maps';


import './Search.css';

import List from './List';
import Filter from './Filter';
import { Pagination } from '@mui/material';
import { getAccessToken } from '../../utils/requests';

const serverUrl = 'http://localhost:8000/'


function Search({ searchFilter, userInfo }) {
  const [loadingAdsListStatus, setLoadingAdsListStatus] = useState(false)
  const [loadingFavoritesListStatus, setLoadingFavoritesListStatus] = useState(false)

  const [currPage, setCurrPage] = useState(1)

  const [adsListData, setAdsListData] = useState()
  const [userListFavorites, setUserListFavorites] = useState([])
  const [filterAds, setFilterAds] = useState({
    address: searchFilter.address,
    min_price: '100',
    max_price: '10000',
  })

  useEffect(() => {
    if (userInfo.isAuthenticated) {
      getAccessToken(getUserListFavorites, userInfo.refresh_token)
    } else {
      setLoadingFavoritesListStatus(true)
    }
    getAdsListData()
  }, [filterAds, currPage])

  const updateFilterAds = (data) => {
    setFilterAds(data)
  }

  const handleChangeCurrPage = (event, value) => {
    setCurrPage(value);
  };

  const getUserListFavorites = (access_token) => {
    axios
      .get(serverUrl + 'api/account/user/profile/', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then((res) => {
        setUserListFavorites(res.data.owned_favorites.map((result) => result.ad))
        setLoadingFavoritesListStatus(true)
      })
      .catch(err => console.error(err));
  }

  const getAdsListData = () => {
    const paramsUrl = `?page=${currPage}` +
      `&price_min=${filterAds.min_price}` +
      `&price_max=${filterAds.max_price}` +
      `&address=${searchFilter.address}`;

    axios
      .get(`${serverUrl}api/ads/${paramsUrl}`)
      .then((res) => {
        setAdsListData(res.data)
        setLoadingAdsListStatus(true)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const getCountPage = (countAds) => {
    // 20 - число элементов в выдаче, можно сделать изменяемым
    // нужна эта канитель чтобы при округлении не потерять последнюю страницу
    let countPage = countAds / 20;

    if (countPage > Math.floor(countPage)) {
      countPage = Math.floor(countPage) + 1;
    } else {
      countPage = Math.floor(countPage);
    }

    return countPage;
  }

  if (loadingAdsListStatus && loadingFavoritesListStatus) {
    console.log(userListFavorites)
  } else {
    return (
      <></>
    )
  }

  return (
    <div className='view_wrapper'>
      <div className='filter'>
        <Filter
          filterAds={filterAds}
          updateFilterAds={updateFilterAds}
        />
      </div>
      <div className='viewer'>
        <div className='wrapper_view_blocks'>
          <List
            adsListData={adsListData.results}
            userInfo={userInfo}
            userListFavorites={userListFavorites}
            getUserListFavorites={getUserListFavorites}
          />
          <div className='pagination_wrapper'>
            <Pagination
              count={getCountPage(adsListData.count)}
              color='secondary'
              variant="outlined"
              size='large'
              showFirstButton showLastButton
              page={currPage} onChange={handleChangeCurrPage}
            />
          </div>
        </div>

      </div>
      <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} className='yandex_maps'>
        <Placemark defaultGeometry={[55.751574, 37.573856]} />
      </Map>
    </div>
  );
}

export default Search;