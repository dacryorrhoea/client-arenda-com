import axios from "axios";
import { useState } from "react";

const serverUrl = 'http://localhost:8000/'

function Booking({userInfo, adCardId, searchFilter}) {
  const [beginLease, setBeginLease] = useState(searchFilter.begin_date)
  const [endLease, setEndLease] = useState(searchFilter.end_date)
  const [countPeople, setCountPeople] = useState()
  const [phobeNumber, setPhoneNumber] = useState()
  const [isError, setIsError] = useState('')

  const postReservation = () => {
    axios.post(serverUrl + "api/token/refresh/", {
      refresh: userInfo.refresh_token
    })
    .then((refresh_res) => {
      axios.post(serverUrl + "api/user/manage/rezervations/",
      {
        begin_lease: beginLease,
        end_lease: endLease,
        ad_id: adCardId
      },
      {
        headers: {
          Authorization: `Bearer ${refresh_res.data.access}`
        }
      })
      .then((res) => {
        console.log('Забронировано')
      })
      .catch(err => {
        console.error(err)
        setIsError('Уже забронировано')
      });
      
    })
    .catch(err => console.error(err));
  }

  const submitForm = (e) => {
    e.preventDefault()
    postReservation()
  }

  return (
    <div className="booking_form_block">
      <form className="booking_form">
        <label>Дата заезда</label>
        <input
          type="date"
          onChange={(e) => setBeginLease(e.target.value)}
          value={beginLease}
        />

        <label>Дата отъезда</label>
        <input
          type="date"
          onChange={(e) => setEndLease(e.target.value)}
          value={endLease}
        />

        <label>Количество гостей</label>
        <input
          type="number"
          onChange={(e) => setCountPeople(e.target.value)}
          value={countPeople}
        />

        {userInfo.isAuthenticated? <></>:
          <>
            <label>Номер телефона</label>
            <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} value={phobeNumber} />
          </>
        }
        
        {isError ? <div >{isError}</div> : null}

        <input type="submit" value='Забронировать' onClick={submitForm} className='btn' />
      </form>
    </div>
  );
}

export default Booking;