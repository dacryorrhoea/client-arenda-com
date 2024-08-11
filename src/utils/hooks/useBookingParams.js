import { useState } from "react"
import { receiveData } from "../data"

const DEFAULT_BOOKING_PARAMS = {
  address: '',
  begin_date: '',
  end_date: '',
  count_people: 1,
  pets_check: false,
  days_lease: 3
}

export function useBookingParams() {
  const savedParams = receiveData('BookingParams') === undefined ?
    DEFAULT_BOOKING_PARAMS
    :
    receiveData('BookingParams');

  const [bookingParams, setBookingParams] = useState(savedParams)

  window.addEventListener('update_booking_params', () => {
    setBookingParams(receiveData('BookingParams'))
    console.log(bookingParams)
  })

  const updateBookingParams = (data) => {
    localStorage.setItem('BookingParams', JSON.stringify(data));
    setBookingParams(data)
    window.dispatchEvent(new Event('update_booking_params'))
  }

  return [bookingParams, updateBookingParams]
}