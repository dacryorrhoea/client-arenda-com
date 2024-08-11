import './Home.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker, InputNumber, AutoComplete, Dropdown, Button, Switch, Space } from 'antd';

import { useBookingParams } from '../../utils/hooks/useBookingParams';
import SearchAdsBar from './SearchAdsBar';

function Home() {
  const [bookingParams, updateBookingParams] = useBookingParams()

  return (
    <>
      <div className='home_welcom_messege_wrap'>
        <h1>Найдём, где остановиться!</h1>
        <p>
          Квартиры, отели, гостевые дома — 300 тысяч вариантов для поездок по России и зарубежью
        </p>
      </div>
      <SearchAdsBar/>
    </>
  );
}

export default Home;