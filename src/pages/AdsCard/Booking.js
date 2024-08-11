import axios from "axios";
import { useEffect, useState } from "react";
import { useBookingParams } from "../../utils/hooks/useBookingParams";
import { useUserStatus } from "../../utils/hooks/useUserStatus";
import { useProfile } from "../../utils/hooks/useProfile";
import { receiveData } from "../../utils/data";
import { DatePicker, Checkbox, Select, InputNumber, Input, Button, Modal, Flex } from "antd";

import dayjs from 'dayjs';
import PageDownloadWaiting from "../../components/PageDownloadWaiting";

const { RangePicker } = DatePicker;

const serverUrl = 'http://localhost:8000/'

function Booking({ adCardId, adReservations }) {
  const [bookingParams, updateBookingParams] = useBookingParams()
  const [userStatus] = useUserStatus()

  const {data, isLoading, isError} = useProfile()

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [leaseDateRange, setLeaseDateRange] = useState([bookingParams.begin_date, bookingParams.end_date])
  const [countPeople, setCountPeople] = useState(bookingParams.count_people)
  const [petsCheck, setPetsCheck] = useState(bookingParams.pets_check)

  const [phobeNumber, setPhoneNumber] = useState()
  const [phoneCode, setPhoneCode] = useState('+375')

  const [isBooked, setIsBooked] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const postReservation = () => {
    console.log({
      begin_lease: leaseDateRange[0],
      end_lease: leaseDateRange[1],
      phone_number: phobeNumber,
      count_people: countPeople,
      pets_check: petsCheck,
      ad_id: adCardId
    })
    // axios.post(serverUrl + "api/token/refresh/", {
    //   refresh: receiveData('UserTokenRefresh')
    // })
    //   .then((refresh_res) => {
    //     axios.post(serverUrl + "api/user/manage/rezervations/",
    //       {
    //         begin_lease: leaseDateRange[0],
    //         end_lease: leaseDateRange[1],
    //         ad_id: adCardId
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${refresh_res.data.access}`
    //         }
    //       })
    //       .then((res) => {
    //         console.log('Забронировано')
    //       })
    //       .catch(err => {
    //         console.error(err)
    //         setIsError('Уже забронировано')
    //       });

    //   })
    //   .catch(err => console.error(err));
  }

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

  if (isLoading) {
    return <PageDownloadWaiting></PageDownloadWaiting>
  }

  return (
    <form className="booking_form">
      <h5>Даты заезда - отъезда</h5>
      <RangePicker
        size='large'
        cellRender={cellRender}
        disabledDate={(current) => { return current && current < dayjs().subtract(1, 'day').endOf('day') }}
        defaultValue={[dayjs(leaseDateRange[0], 'YYYY/MM/DD'), dayjs(leaseDateRange[1], 'YYYY/MM/DD')]}
        // status={isBooked?'Уже забронировано':<></>}
        onChange={(e, es) => { if (e) setLeaseDateRange(es) }}
        style={{ width: 290, height: 44, 'margin-bottom': '20px' }}
      />



      {/* {userStatus !== 'Anon' ? <></> :
        <>
          <label>Номер телефона</label>
          <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} value={phobeNumber} />
        </>
      } */}

      {isBooked ?
        <Button type="primary" disabled >
          Уже забронировано
        </Button> :
        <Button type="primary" onClick={showModal}>
          Забронировать
        </Button>
      }

      <Modal title="Бронирование" open={isModalOpen} onOk={postReservation} onCancel={handleCancel}>
        <Flex gap="middle" vertical>
          <Flex>
            <Input 
              placeholder="Имя" 
              defaultValue={isError?'':data.first_name}
              onChange={(e) => {setFirstName(e)}}
            />
            <Input
              placeholder="Фамилия"
              defaultValue={isError?'':data.last_name}
              onChange={(e) => {setLastName(e)}}
            />
          </Flex>
          <Input
            addonBefore={
              <Select
                defaultValue={phoneCode}
                options={[{ value: '+375', label: '+375' }, { value: '+7', label: '+7' }]}
                onChange={(e) => { setPhoneCode(e) }}
              />
            }
            placeholder='445869098'
            onChange={(e) => { setPhoneNumber(phoneCode + e.target.value) }}
          />

          <Checkbox onChange={(e) => console.log(e)}>Дети</Checkbox>
          <Checkbox onChange={(e) => console.log(e)}>Питомцы</Checkbox>
        </Flex>
      </Modal>
    </form>
  );
}

export default Booking;