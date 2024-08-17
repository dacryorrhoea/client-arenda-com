import { Modal, Input, Flex, Select, Checkbox, InputNumber, Button, Steps, Descriptions } from "antd"
import { CloseCircleFilled, CheckCircleFilled } from "@ant-design/icons"
import axios from "axios";
import { useEffect, useState } from "react";
import { useBookingParams } from "../../utils/hooks/useBookingParams";
import { useUserStatus } from "../../utils/hooks/useUserStatus";
import { useProfile } from "../../utils/hooks/useProfile";
import { receiveData } from "../../utils/data";
import dayjs from "dayjs";

const serverUrl = 'http://localhost:8000/'

const steps = [
  {
    title: 'Бланк',
  },
  {
    title: 'Оплата',
  },
  {
    title: 'Готово'
  }
];

function BookingFormRentor({ cashBack, isModalOpen, setIsModalOpen, adCardId, adPrice, leaseDateRange, adCountPeople }) {
  const [bookingParams] = useBookingParams()

  const { data, isLoading } = useProfile()

  const [countPeople, setCountPeople] = useState(bookingParams.count_people)
  const [petsCheck, setPetsCheck] = useState(bookingParams.pets_check)

  const [finalPrice, setFinalPrice] = useState(~~((adPrice * dayjs(leaseDateRange[1]).diff(dayjs(leaseDateRange[0]), 'days')) - ((adCountPeople - countPeople) * (adPrice * dayjs(leaseDateRange[1]).diff(dayjs(leaseDateRange[0]), 'days') / 50))))

  const [isInvalidInputStepTwo, setIsInvalidInputStepTwo] = useState(false)
  const [isErrorPost, setIsErrorPost] = useState('')

  const [currentStep, setCurrentStep] = useState(0)
  const [reservationId, setReservationId] = useState()

  const [cardName, setCardName] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [cardCVV, setCardCVV] = useState('')
  const [paymentReceipt, setPaymentReceipt] = useState()

  // валидация данных карты (пока минимальная)
  useEffect(() => {
    if (cardName.length > 8 && cardHolder && cardCVV.length > 3) {
      setIsInvalidInputStepTwo(false)
    } else {
      if (currentStep == 1) setIsInvalidInputStepTwo(true)
    }
  }, [cardName, cardHolder, cardCVV])

  useEffect(() => {
    setFinalPrice(~~((adPrice * dayjs(leaseDateRange[1]).diff(dayjs(leaseDateRange[0]), 'days')) - ((adCountPeople - countPeople) * (adPrice * dayjs(leaseDateRange[1]).diff(dayjs(leaseDateRange[0]), 'days') / 50))))
  }, [countPeople, leaseDateRange])

  useEffect(() => {
    if (currentStep == 0) {
      setIsInvalidInputStepTwo(false)
    }
    if (currentStep == 1) {
      setIsInvalidInputStepTwo(true)
      postReservation()
    }
    if (currentStep == 2) {
      postPayment()
    }
    if (currentStep > 3 || currentStep == 3) {
      setIsModalOpen(false)
    }
  }, [currentStep])

  const postPayment = () => {
    const postData = {
      sum: finalPrice,
      card_name: cardName,
      card_holder: cardHolder,
      card_cvv: cardCVV,
      reservation_id: reservationId
    }

    let flag = false
    for (let i in postData) {
      if (!postData[i] && typeof postData[i] !== 'boolean') {
        flag = true;
        break;
      }
    }

    if (flag) {
      setIsInvalidInputStepTwo(true)
    } else {
      setIsInvalidInputStepTwo(false)
    }

    console.log(postData)
    axios.post(serverUrl + 'api/user/manage/payment/', postData).then((res) => {
      setPaymentReceipt("-> я чек <-")
    }).catch(err => setIsErrorPost(err));
  }

  const postReservation = () => {
    const postData = {
      begin_lease: leaseDateRange[0],
      end_lease: leaseDateRange[1],
      first_name: data.profile.first_name,
      last_name: data.profile.last_name,
      phone_number: '375445872344',
      count_people: countPeople,
      pets_check: petsCheck,
      ad_id: adCardId
    }

    console.log(postData)
    setReservationId('12212')
    axios.post(serverUrl + "api/token/refresh/", {
      refresh: receiveData('UserTokenRefresh')
    })
      .then((refresh_res) => {
        axios.post(serverUrl + "api/user/manage/rezervations/",
          postData,
          {
            headers: {
              Authorization: `Bearer ${refresh_res.data.access}`
            }
          })
          .then((res) => {
            console.log('Забронировано')
            setReservationId(res.data.id)
          })
          .catch(err => {
            console.error(err)
          });

      })
      .catch(err => console.error(err));
  }

  return (
    <Modal
      title='Бронирование'
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      loading={isLoading}
      footer={[
        <Button disabled={currentStep > 2} onClick={() => { if (currentStep > 0) setCurrentStep(currentStep - 1) }}>Назад</Button>,
        <Button disabled={isInvalidInputStepTwo} type="primary" onClick={() => { setCurrentStep(currentStep + 1) }}>
          {currentStep > 1? 'Готово': 'Дальше'}
        </Button>,
      ]}
    >
      <Flex gap="middle" vertical>
        <Steps current={currentStep} items={steps} direction="horizontal" />
        {currentStep === 0 ?
          <>
            <Descriptions title="Ваши данные" layout="vertical">
              <Descriptions.Item label="Имя">{data ? data.profile.first_name : ''}</Descriptions.Item>
              <Descriptions.Item label="Фамилия">{data ? data.profile.last_name : ''}</Descriptions.Item>
              <Descriptions.Item label="Телефон">{data? data.profile.phone_number: ''}</Descriptions.Item>
            </Descriptions>
            <p>
              Количество гостей: <span> </span>
              <InputNumber
                min={1}
                max={adCountPeople}
                defaultValue={countPeople}
                className='search'
                size='large'
                style={{ width: 65, 'font-size': 18, }}
                onChange={(e) => { setCountPeople(e) }}
              />
            </p>
            <p>
              Питомец:
              {bookingParams.pets_check ?
                <CheckCircleFilled style={{ 'margin-left': '4px', 'font-size': '20px', 'color': '#417505' }} />
                :
                <CloseCircleFilled style={{ 'margin-left': '4px', 'font-size': '20px', 'color': '#ed0e42' }} />
              }
            </p>
            <p>
              Дети:
              {bookingParams.kids_check ?
                <CheckCircleFilled style={{ 'margin-left': '4px', 'font-size': '20px', 'color': '#417505' }} />
                :
                <CloseCircleFilled style={{ 'margin-left': '4px', 'font-size': '20px', 'color': '#ed0e42' }} />
              }
            </p>
            <p>
              Итоговое количество дней: <span> </span> {dayjs(leaseDateRange[1]).diff(dayjs(leaseDateRange[0]), 'days')}
            </p>
            <p>
              Итоговая цена: <span> </span> {finalPrice}
            </p>
            <p>
              Кэшбэк: <span> </span> {~~(finalPrice / cashBack)}
            </p>
          </>
          :
          <></>}

        {currentStep === 1 ?
          <>
            <Input status={isInvalidInputStepTwo?'error':''} placeholder="XXXX-XXXX-XXXX-XXXX" onChange={(e) => setCardName(e.target.value)}/>
            <Flex>
              <Input status={isInvalidInputStepTwo?'error':''} placeholder="CARD HOLDER" style={{'width':'200px'}} onChange={(e) => setCardHolder(e.target.value)}/>
              <Input status={isInvalidInputStepTwo?'error':''} placeholder="CVV" style={{'width':'80px','margin-left':'200px'}} onChange={(e) => setCardCVV(e.target.value)}/>
            </Flex>
          </>
          :
          <></>}

        {currentStep === 2 ?
          <>
            {isInvalidInputStepTwo? 'На предыдущем шаге указаны некоректные данные.':'Вы успешно создали бронь и совершили оплату'}
            {isErrorPost? isErrorPost: ''}
            <span> </span>{paymentReceipt}
          </>
          :
          <></>}
        
        {/* {isInvalidInputStepTwo ? 'Введите данные в пустые поля' : ''} */}
      </Flex>
    </Modal>
  )
}


export default BookingFormRentor;