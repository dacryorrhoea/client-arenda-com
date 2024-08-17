import axios from "axios";
import { useEffect, useState } from "react";
import { useBookingParams } from "../../utils/hooks/useBookingParams";
import { useUserStatus } from "../../utils/hooks/useUserStatus";
import { useProfile } from "../../utils/hooks/useProfile";
import BookingFormAnon from "./BookingFormAnon";
import BookingFormRentor from "./BookingFormRentor";
import { receiveData } from "../../utils/data";
import { DatePicker, Button } from "antd";

import dayjs from 'dayjs';
import PageDownloadWaiting from "../../components/PageDownloadWaiting";

const { RangePicker } = DatePicker;


function Booking({ cashBack, adCardId, adReservations, adPrice, adCountPeople }) {
  const [bookingParams] = useBookingParams()
  const [userStatus] = useUserStatus()

  const [leaseDateRange, setLeaseDateRange] = useState([bookingParams.begin_date, bookingParams.end_date])

  const [isBooked, setIsBooked] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false);

  // проверка на доступность выбранных дат
  useEffect(() => {
    let flag = false
    for (let i in adReservations) {
      const begin = dayjs(adReservations[i].begin_lease)
      const end = dayjs(adReservations[i].end_lease)

      if (!(dayjs(leaseDateRange[1]) <= begin || dayjs(leaseDateRange[0]) >= end)) {
        flag = true;
        break
      }
    }
    if (flag) {
      setIsBooked(true);
    } else {
      setIsBooked(false)
    }
  }, [leaseDateRange])

  const showModal = () => {
    setIsModalOpen(true);
  };  

  const cellRender = (current, info) => {
    let curr_style = { 'border': 'none' }
    for (let i in adReservations) {
      const begin = dayjs(adReservations[i].begin_lease)
      const end = dayjs(adReservations[i].end_lease)

      if (begin['$y'] === current['$y'] && begin['$M'] === current['$M'] && begin['$D'] === current['$D']) {
        if (curr_style['border'] !== 'none') {
          return <div className="ant-picker-cell-inner" style={{ border: `1px solid red`, borderRadius: '50%' }}>{current.date()}</div>
        }
        curr_style = { 'border-right': `1px solid red`, borderRadius: '50%' }
      }

      if (end['$y'] === current['$y'] && end['$M'] === current['$M'] && end['$D'] === current['$D']) {
        if (curr_style['border'] !== 'none') {
          return <div className="ant-picker-cell-inner" style={{ border: `1px solid red`, borderRadius: '50%' }}>{current.date()}</div>
        }
        curr_style = { 'border-left': `1px solid red`, borderRadius: '50%' }
      }

      let a = begin.add(1, 'day')
      let b = begin.add(1, 'day')
      while (b < end) {
        if (b['$y'] === current['$y'] && b['$M'] === current['$M'] && b['$D'] === current['$D']) {
          return <div className="ant-picker-cell-inner" style={{ border: `1px solid red`, borderRadius: '50%' }}>{current.date()}</div>
        }
        a = b.add(1, 'day')
        b = a
      }
    }

    if (dayjs()['$y'] === current['$y'] && dayjs()['$M'] === current['$M'] && dayjs()['$D'] === current['$D']) {
      return <div className="ant-picker-active" style={curr_style}>{current.date()}</div>
    }
    return <div className="ant-picker-cell-inner" style={curr_style}>{current.date()}</div>
  };

  return (
    <form className="booking_form">
      <h5>Даты заезда - отъезда</h5>
      <RangePicker
        size='large'
        cellRender={cellRender}
        disabledDate={(current) => { return current && current < dayjs().subtract(1, 'day').endOf('day') }}
        defaultValue={[dayjs(leaseDateRange[0], 'YYYY/MM/DD'), dayjs(leaseDateRange[1], 'YYYY/MM/DD')]}
        onChange={(e, es) => { if (e) setLeaseDateRange(es) }}
        style={{ width: 290, height: 44, 'margin-bottom': '20px' }}
      />

      {isBooked ?
        <Button type="primary" disabled >
          Уже забронировано
        </Button> :
        <Button type="primary" onClick={showModal}>
          Бронирование
        </Button>
      }

      {userStatus === 'Anon'?
        <BookingFormAnon cashBack={cashBack} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} adCardId={adCardId} adPrice={adPrice} leaseDateRange={leaseDateRange} adCountPeople={adCountPeople}/>
      :
        <BookingFormRentor cashBack={cashBack} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} adCardId={adCardId} adPrice={adPrice} leaseDateRange={leaseDateRange} adCountPeople={adCountPeople}/>
      }
      
    </form>
  );
}

export default Booking;