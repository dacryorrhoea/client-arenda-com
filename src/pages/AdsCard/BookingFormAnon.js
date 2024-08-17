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
    title: 'SMS',
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

  const [countPeople, setCountPeople] = useState(bookingParams.count_people)
  const [petsCheck, setPetsCheck] = useState(bookingParams.pets_check)

  const [finalPrice, setFinalPrice] = useState(~~((adPrice * dayjs(leaseDateRange[1]).diff(dayjs(leaseDateRange[0]), 'days')) - ((adCountPeople - countPeople) * (adPrice * dayjs(leaseDateRange[1]).diff(dayjs(leaseDateRange[0]), 'days') / 50))))

  const [isInvalidInputStepOne, setIsInvalidInputStepOne] = useState(false)
  const [isInvalidInputStepTwo, setIsInvalidInputStepTwo] = useState(false)
  const [isInvalidInputStepThree, setIsInvalidInputStepThree] = useState(false)
  const [isErrorPost, setIsErrorPost] = useState('')

  const [currentStep, setCurrentStep] = useState(0)
  const [reservationId, setReservationId] = useState()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneCode, setPhoneCode] = useState('375')

  const [confirmCodeId, setConfirmCodeId] = useState()
  const [confirmCode, setConfirmCode] = useState()

  const [cardName, setCardName] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [cardCVV, setCardCVV] = useState('')
  const [paymentReceipt, setPaymentReceipt] = useState()

  const [isSuccesApprove, setIsSuccesApprove] = useState(false)

  // валидация персональных данных
  useEffect(() => {
    if (firstName && lastName && phoneNumber) {
      setIsInvalidInputStepOne(false)
    } else {
      if (currentStep == 0) setIsInvalidInputStepOne(true)
    }
  }, [firstName, lastName, phoneNumber])

  // если код подтвердился
  useEffect(() => {
    if (isSuccesApprove) setIsInvalidInputStepTwo(false)
  }, [isSuccesApprove])

  // валидация получения кода на телефон
  useEffect(() => {
    if (currentStep == 1) approveConfirmCode()
  }, [confirmCode])

  // валидация данных карты (пока минимальная)
  useEffect(() => {
    if (cardName.length > 8 && cardHolder && cardCVV.length > 3) {
      setIsInvalidInputStepThree(false)
    } else {
      if (currentStep == 2) setIsInvalidInputStepThree(true)
    }
  }, [cardName, cardHolder, cardCVV])

  // расчёт цены при изменение параметров
  useEffect(() => {
    setFinalPrice(~~((adPrice * dayjs(leaseDateRange[1]).diff(dayjs(leaseDateRange[0]), 'days')) - ((adCountPeople - countPeople) * (adPrice * dayjs(leaseDateRange[1]).diff(dayjs(leaseDateRange[0]), 'days') / 50))))
  }, [countPeople, leaseDateRange])

  useEffect(() => {
    if (currentStep == 0) {
    }
    if (currentStep == 1) {
      getConfirmCode()
      setIsInvalidInputStepTwo(true)
    }
    if (currentStep == 2) {
      postReservation()
      setIsInvalidInputStepThree(true)
    }
    if (currentStep == 3) {
      postPayment()
    }
    if (currentStep >= 4) {
      setIsModalOpen(false)
    }
  }, [currentStep])

  const approveConfirmCode = () => {
    console.log(`Отправил нa сервер введёный код`)
    axios.post(serverUrl + 'api/confirm/code/approve/', { confirm_code_id: confirmCodeId, confirm_code: confirmCode })
      .then((res) => {
        console.log(`Код верный!`)
        setIsSuccesApprove(true)
      })
      .catch(err => {
        console.error(err)
      });
  }

  const getConfirmCode = () => {
    console.log(`Отправил код на на номер ${phoneNumber}`)
    axios.post(serverUrl + 'api/confirm/code/', { phone_number: phoneNumber })
      .then((res) => {
        console.log(`Получил код с id ${res.data.id}`)
        setConfirmCodeId(res.data.id)
      })
      .catch(err => {
        console.error(err)
      });
  }

  const postPayment = () => {
    // console.log(postData)
    axios.post(serverUrl + 'api/user/manage/payment/', {
      sum: finalPrice,
      card_name: cardName,
      card_holder: cardHolder,
      card_cvv: cardCVV,
      reservation_id: reservationId
    }).then((res) => {
      setPaymentReceipt("-> я чек <-")
    }).catch(err => setIsErrorPost(err));
  }

  const postReservation = () => {
    // console.log(postData)
    // setReservationId('12212')
    axios.post(serverUrl + "api/unreg/user/create/rezervations/", {
        begin_lease: leaseDateRange[0],
        end_lease: leaseDateRange[1],
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        count_people: countPeople,
        pets_check: petsCheck,
        ad_id: adCardId
      }).then((res) => {
        console.log('Забронировано')
        setReservationId(res.data.id)
      }).catch(err => {
        console.error(err)
      });
  }

  return (
    <Modal
      title='Бронирование'
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button disabled={currentStep > 2} onClick={() => { if (currentStep > 0) setCurrentStep(currentStep - 1) }}>Назад</Button>,
        <Button
          disabled={(currentStep == 0 && isInvalidInputStepOne) || (currentStep == 1 && isInvalidInputStepTwo) || (currentStep == 2 && isInvalidInputStepThree)}
          type="primary"
          onClick={() => { setCurrentStep(currentStep + 1) }}>
          {currentStep > 1 ? 'Готово' : 'Дальше'}
        </Button>,
      ]}
    >
      <Flex gap="middle" vertical>
        <Steps current={currentStep} items={steps} direction="horizontal" />
        {currentStep === 0 ?
          <>
            <Flex>
              <Input placeholder="Имя" onChange={(e) => { setFirstName(e.target.value) }} />
              <Input placeholder="Фамилия" onChange={(e) => { setLastName(e.target.value) }} />
            </Flex>
            <Input
              addonBefore={
                <Select
                  defaultValue={phoneCode}
                  options={[{ value: '375', label: '+375' }, { value: '7', label: '+7' }]}
                  onChange={(e) => { setPhoneCode(e) }}
                />
              }
              placeholder='445869098'
              onChange={(e) => { setPhoneNumber(phoneCode + e.target.value) }}
            />
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
            <p>На ваш номер телефона был отправлен код подтверждения</p>
            <Input.OTP onChange={(e) => setConfirmCode(e)} />
            <Button onClick={getConfirmCode}>Отправить код повторно</Button>
          </>
          :
          <></>}

        {currentStep === 2 ?
          <>
            <Input status={isInvalidInputStepTwo ? 'error' : ''} placeholder="XXXX-XXXX-XXXX-XXXX" onChange={(e) => setCardName(e.target.value)} />
            <Flex>
              <Input status={isInvalidInputStepTwo ? 'error' : ''} placeholder="CARD HOLDER" style={{ 'width': '200px' }} onChange={(e) => setCardHolder(e.target.value)} />
              <Input status={isInvalidInputStepTwo ? 'error' : ''} placeholder="CVV" style={{ 'width': '80px', 'margin-left': '200px' }} onChange={(e) => setCardCVV(e.target.value)} />
            </Flex>
          </>
          :
          <></>}

        {currentStep === 3 ?
          <>
            {isInvalidInputStepTwo ? 'На предыдущем шаге указаны некоректные данные.' : 'Вы успешно создали бронь и совершили оплату'}
            {isErrorPost ? isErrorPost : ''}
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