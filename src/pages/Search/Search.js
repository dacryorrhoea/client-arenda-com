import { useState, useEffect } from 'react';
import axios from 'axios';
import { Segmented, Tag } from 'antd';


import './Search.css';

import List from './List';
import Filter from './Filter';
import TagsLine from './TagsLine';
import { Pagination } from '@mui/material';
import { useBookingParams } from '../../utils/hooks/useBookingParams';
import { useUserStatus } from '../../utils/hooks/useUserStatus';
import YandexMaps from './YandexMaps';

const serverUrl = 'http://localhost:8000/'

const orderingKey = {
  'по популярности': '',
  'по рейтингу': 'price',
  'дёшево и быстро': '-price'
}

function Search() {
  const [bookingParams, updateBookingParams] = useBookingParams()
  const [userStatus] = useUserStatus()

  const [loadingAdsListStatus, setLoadingAdsListStatus] = useState(false)

  const [currPage, setCurrPage] = useState(1)

  const [adsListData, setAdsListData] = useState()
  const [userListFavorites, setUserListFavorites] = useState([])
  
  const [formatCalculatingPrice, setFormatCalculatingPrice] = useState(true)

  const [filterAds, setFilterAds] = useState({
    address: bookingParams.address,
    price_min: '500',
    price_max: '20000',
  })
  const [currOrdering, setCurrOrdering] = useState('')

  useEffect(() => {
    getAdsListData()
  }, [filterAds, currPage, currOrdering])

  const updateFilterAds = (data) => {
    console.log(data)
    setFilterAds(data)
  }

  const handleChangeCurrPage = (event, value) => {
    setCurrPage(value);
  };

  const getAdsListData = () => {
    const paramsUrl = `?page=${currPage}&ordering=${currOrdering}`;
    axios
      .get(`${serverUrl}api/ads/${paramsUrl}`, {
        params: filterAds
      })
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

  if (!loadingAdsListStatus) {
    return (
      <>
      </>
    )
  }

  return (
    <div className='view_wrapper'>
      <div style={{'min-height': '95v','width': '14%'}}>
        <div className='filter'>
          <Filter
            filterAds={filterAds}
            updateFilterAds={updateFilterAds}
            setFormatCalculatingPrice={setFormatCalculatingPrice}
          />
        </div>
      </div>
      <div className='viewer'>
        <div className='wrapper_view_blocks'>
          <div className='accepted_filters'>
            <TagsLine filterAds={filterAds} updateFilterAds={updateFilterAds}/>
          </div>
          <div className='ordering_block'>
            <p style={{ 'font-size': '18px'}}>
              <span className='finded_obj'>Найдено {adsListData.count} вариантов жилья</span>
              <Segmented
                size="small"
                options={['по популярности', 'по рейтингу', 'дёшево и быстро']}
                onChange={(value) => { setCurrOrdering(orderingKey[value]) }}
                style={{'font-size': '15px','font-weight': '600'}}
              />
            </p>
          </div>
          <List
            adsListData={adsListData.results}
            formatCalculatingPrice={formatCalculatingPrice}
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
      <div style={{'min-height': '95v','width': '40%'}}>
      <YandexMaps adsListData={adsListData.results}/>
      </div>
    </div>
  );
}

export default Search;