import { useState, useEffect } from 'react';
import axios from 'axios';
import { Map, Placemark} from '@pbe/react-yandex-maps';

import './Search.css';

import List from './List';
import Filter from './Filter';

const serverUrl = 'http://localhost:8000/'


function Search({ searchFilter }) {
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [adsListData, setAdsListData] = useState()
  const [filterAds, setFilterAds] = useState({
    address: searchFilter.address,
    min_price: '100',
    max_price: '10000',
  })

  useEffect(() => {
    getAdsListData(filterAds)
  }, [filterAds])
  
  const updateFilterAds = (data) => {
    setFilterAds(data)
  }

  const getAdsListData = (filter) => {
    const paramsUrl = `?price_min=${filter.min_price}&price_max=${filter.max_price}`;
    axios.get(`${serverUrl}api/ads/${paramsUrl}`)
    .then((res) => {
      setAdsListData(res.data)
      setLoadingStatus(true)
    }).catch((err) => {
      console.error(err);
    });
  }

  if (!loadingStatus) {
    return (
      <></>
    )
  }

  return (
    <div className='view_wrapper'>
      <div className='filter'>
        <Filter filterAds={filterAds} updateFilterAds={updateFilterAds} />
      </div>
      <div className='viewer'>
        <div className='wrapper_view_blocks'>
          <List adsListData={adsListData} />
        </div>
      </div>
      <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} className='yandex_maps'>
        <Placemark defaultGeometry={[55.751574, 37.573856]} />
      </Map>
    </div>
  );
}

export default Search;