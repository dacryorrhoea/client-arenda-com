import { useState } from "react";

function Booking() {
  const [beginLease, setBeginLease] = useState()
  const [endLease, setEndLease] = useState()
  const [countPeople, setCountPeople] = useState()
  const [phobeNumber, setPhoneNumber] = useState()

  const submitForm = () => {

  }

  return (
    <div className="booking_form_block">
      <form className="booking_form">
        <label>Дата заезда</label>
        <input type="date" onChange={(e) => setBeginLease(e.target.value)} value={beginLease} />

        <label>Дата отъезда</label>
        <input type="date" onChange={(e) => setEndLease(e.target.value)} value={endLease} />

        <label>Количество гостей</label>
        <input type="number" onChange={(e) => setCountPeople(e.target.value)} value={countPeople} />

        <label>Номер телефона</label>
        <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} value={phobeNumber} />

        <input type="submit" value='Забронировать' onClick={submitForm} className='btn' />
      </form>
    </div>
  );
}

export default Booking;