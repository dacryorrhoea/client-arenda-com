import { useState } from 'react';
import './Placing.css';
import axios from 'axios';

const serverUrl = 'http://localhost:8000/'

function Placing({ userInfo }) {
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const toPublishAd = () => {
    axios.post(serverUrl + "api/token/refresh/", {
      refresh: userInfo.refresh_token
    })
    .then((refresh_res) => {
      axios.post(serverUrl + "api/lessor/ads/",
      {
        address: address,
        price: price,
        description: description
      },
      {
        headers: {
          Authorization: `Bearer ${refresh_res.data.access}`
        }
      })
      .then((res) => {
        console.log('сделано')
      })
      .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }

  const submitForm = (e) => {
    e.preventDefault()
    toPublishAd()
  }

  return (
    <div className="placing_wrapper">
      <form className="placing_block">
          <label>Адрес</label>
          <input type="text" onChange={(e)=>setAddress(e.target.value)} value={address} />

          <label>Цена</label>
          <input type="text" onChange={(e)=>setPrice(e.target.value)} value={price} />

          <label>Описание</label>
          <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description} />

          <input type="submit" value='Создать' onClick={submitForm} className='btn' />
        </form>
    </div>
  );
}

export default Placing;