import './Profile.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Segmented, Flex, List, Tag, TimePicker, InputNumber, DatePicker, Button, Rate, Select, Modal, Popconfirm, Form, Input, Checkbox, AutoComplete, Slider, Switch } from "antd";
import { StarFilled, StarOutlined } from '@ant-design/icons';

import LessorList from './LessorList';
import RentorList from './RentorList';
import PageDownloadWaiting from '../../components/PageDownloadWaiting';

import { logout } from '../../utils/requests/client.auth';
import { useProfile } from '../../utils/hooks/useProfile';
import { useUserStatus } from '../../utils/hooks/useUserStatus';
import { getAccessToken } from '../../utils/token';
import dayjs from 'dayjs';

const serverUrl = 'http://localhost:8000/'
const { TextArea } = Input;

function CreateAds({ isOpenCreateAds, setIsOpenCreateAds }) {
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    console.log()
    const access = await getAccessToken()
    axios.post(serverUrl + "api/user/manage/ads/",
      {
        description: values.description,
        img_src: values.img_src,
        clock_entry: `Заезд после ${values.clock_entry.format('HH:mm')}`,
        clock_leave: `Отъезд до ${values.clock_leave.format('HH:mm')}`,
        min_length_of_stay: values.min_length_of_stay,
        max_length_of_stay: values.max_length_of_stay,
        animal_check: values.rules.includes('animal_check') ? true : false,
        smoking_check: values.rules.includes('smoking_check') ? true : false,
        party_check: values.rules.includes('party_check') ? true : false,
        docs_check: values.docs_check,
        kids_check: values.rules.includes('kids_check') ? true : false,
        wifi: values.comfort.includes('wifi') ? true : false,
        drier: values.comfort.includes('drier') ? true : false,
        towel: values.comfort.includes('towel') ? true : false,
        bed_linen: values.comfort.includes('bed_linen') ? true : false,
        tv: values.comfort.includes('tv') ? true : false,
        microwave: values.comfort.includes('microwave') ? true : false,
        electric_kettle: values.comfort.includes('electric_kettle') ? true : false,
        balcony: values.comfort.includes('balcony') ? true : false,
        params: '14 гостей, 9 кроватей, 4 спальни, всего этажей 2',
        count_beds: values.count_beds,
        square: values.square,
        count_people: values.count_people,
        sleeping_places: values.sleeping_places,
        beds_info: '4 односпальных кровати, 4 двуспальных кровати',
        type_flats: 'Вилла',
        short_desc: values.short_desc,
        address: values.address,
        price: values.price,
      },
      { headers: { Authorization: `Bearer ${access}` } })
      .then((res) => {
        console.log('сделано: ', res.data)
      })
      .catch(err => console.error(err));
  };

  return (
    <Modal
      title='Описание объявления'
      width={700}
      open={isOpenCreateAds}
      onCancel={() => setIsOpenCreateAds(false)}
      footer={[<Button type="primary" onClick={() => { form.submit() }}>Разместить объявление</Button>,]}
    >
      <Flex justify='center'
        style={{
          'overflow': 'scroll',
          'overflow-x': 'hidden',
          'flex': '1 0',
          'height': '70vh',
          'scrollbar-width': 'none'
        }}>
        <Form
          form={form}
          layout='vertical'
          style={{ 'width': '100%', 'padding': '1%' }}
          // initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item label='Адрес' name="address" rules={[{ required: true, message: 'Укажите адрес!' }]}>
            <AutoComplete></AutoComplete>
          </Form.Item>

          <Form.Item label='Изображение' name="img_src" rules={[{ required: true, message: 'Изображение!' }]}>
            <Input></Input>
          </Form.Item>

          <Form.Item label='Полное описание' name="description" rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <TextArea/>
          </Form.Item>

          <Form.Item label='Краткое описание' name="short_desc" rules={[{ required: true, message: 'Укажите краткое описание объекта!' }]}>
            <TextArea/>
          </Form.Item>

          <Form.Item label='Заезд после' name="clock_entry" rules={[{ required: true, message: 'Изображение!' }]}>
            <TimePicker format={'HH:mm'} />
          </Form.Item>

          <Form.Item label='Отъезд до' name="clock_leave" rules={[{ required: true, message: 'Изображение!' }]}>
            <TimePicker format={'HH:mm'}/>
          </Form.Item>

          <Form.Item name="rules" initialValue={[]}>
            <Select
              mode="multiple"
              placeholder="Выберите что разрешеные действия на объекте"
              defaultValue={[]}
              style={{ width: '100%' }}
              options={[
                { value: 'animal_check', label: 'Можно с питомцами' },
                { value: 'smoking_check', label: 'Можно курить' },
                { value: 'party_check', label: 'Можно вечеринки' },
                { value: 'kids_check', label: 'Можно с детьми' },
              ]}
            />
          </Form.Item>

          <Form.Item name="comfort" initialValue={[]}>
            <Select
              mode="tags"
              placeholder="Выберите удобства объекта"
              style={{ width: '100%' }}
              options={[
                { value: 'wifi', label: 'Вай-фай' },
                { value: 'drier', label: 'Фен' },
                { value: 'towel', label: 'Полотенце' },
                { value: 'bed_linen', label: 'Постельное бельё' },
                { value: 'tv', label: 'Телевизор' },
                { value: 'microwave', label: 'Микроволновка' },
                { value: 'electric_kettle', label: 'Электрический чайник' },
                { value: 'balcony', label: 'Балкон/лоджия' },
              ]}
            />
          </Form.Item>

          <Form.Item name='docs_check' initialValue={true}>
            <Checkbox defaultChecked>Предоставляются документы о проживании</Checkbox>
          </Form.Item>

          <Form.Item label='Цена за сутки' name='price' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber></InputNumber>
          </Form.Item>

          <Form.Item label='Площадь' name='square' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber/>
          </Form.Item>

          <Form.Item label='Максимальное число людей' name='count_people' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber></InputNumber>
          </Form.Item>
          
          <Form.Item label='Число спальных мест' name='sleeping_places' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber></InputNumber>
          </Form.Item>
          
          <Form.Item label='Число кроватей' name='count_beds' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber></InputNumber>
          </Form.Item>
          
          <Form.Item label='Минимальное число дней пребывания' name='min_length_of_stay' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber></InputNumber>
          </Form.Item>
          
          <Form.Item label='Максимальное число дней пребывания' name='max_length_of_stay' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber></InputNumber>
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  )
}

function UpdateProfile({ isOpenUpdateProfile, setIsOpenUpdateProfile }) {
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    console.log(values)
    // const access = await getAccessToken()
    // axios.post(serverUrl + "api/user/manage/ads/",
    //   {
        
    //   },
    //   { headers: { Authorization: `Bearer ${access}` } })
    //   .then((res) => {
    //     console.log('сделано: ', res.data)
    //   })
    //   .catch(err => console.error(err));
  };
  return (
    <Modal
      title='Данные профиля'
      open={isOpenUpdateProfile}
      onCancel={() => setIsOpenUpdateProfile(false)}
      footer={[<Button type="primary" onClick={() => { form.submit() }}>Обновить</Button>,]}
    >
      <Flex justify='center'
        style={{
          'overflow': 'scroll',
          'overflow-x': 'hidden',
          'flex': '1 0',
          'height': '70vh',
          'scrollbar-width': 'none'
        }}>
        <Form
          form={form}
          layout='vertical'
          style={{ 'width': '100%', 'padding': '1%' }}
          // initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item label='Адрес' name="address" rules={[{ required: true, message: 'Укажите адрес!' }]}>
            <AutoComplete></AutoComplete>
          </Form.Item>

          <Form.Item label='Изображение' name="img_src" rules={[{ required: true, message: 'Изображение!' }]}>
            <Input></Input>
          </Form.Item>

          <Form.Item label='Полное описание' name="description" rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <TextArea/>
          </Form.Item>

          <Form.Item label='Краткое описание' name="short_desc" rules={[{ required: true, message: 'Укажите краткое описание объекта!' }]}>
            <TextArea/>
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  )
}



function Profile() {
  const { isLoading, data } = useProfile()
  const [userStatus] = useUserStatus()

  const [isOpenCreateAds, setIsOpenCreateAds] = useState(false)
  const [isOpenUpdateAds, setIsOpenUpdateAds] = useState(false)
  // const [isOpenDeleteAds, setIsOpenDeleteAds] = useState(false)

  const [isOpenUpdateProfile, setIsOpenUpdateProfile] = useState(false)
  // const [isOpenDeleteProfile, setIsOpenDeleteProfile] = useState(false)

  if (isLoading) {
    return (
      <PageDownloadWaiting />
    )
  }

  return (
    <>
      <div className="profile_wrapper">
        <div style={{ 'min-height': '95vh', 'width': '20%' }}>
          <div className='profile_info_block'>
            <Flex vertical>
              <Flex>
                <img src={data.profile.avatar} alt="" className='profile_photo' />
                <div style={{ 'margin-left': '15px', 'margin-top': '40px', 'font-size': '16px' }}>
                  <p style={{ 'font-size': '21px', 'font-weight': '600', 'margin': '0' }}>{data.profile.first_name}</p>
                  <p style={{ 'margin-bottom': '10px' }}>{data.profile.last_name} {data.profile.patronymic}</p>
                  <p style={{ 'font-weight': '600' }}>Рэйтинг: 9.5 <StarFilled style={{ 'color': 'red', 'font-size': '18px' }} /></p>
                </div>
              </Flex>
              <div className='user_info'>
                <p style={{ 'margin': '0', 'font-size': '18px' }}>Почта: {data.profile.email}</p>
                <p style={{ 'margin': '0', 'font-size': '18px' }}>Телефон: +{data.profile.phone_number}</p>
                {userStatus === 'Lessor'?
                  <p style={{ 'margin': '0', 'font-size': '18px' }}>Объявлений: {data.owned_ads.length}</p>
                :
                  <></>
                }
                {userStatus === 'Rentor'?
                  <>
                    <p style={{ 'margin': '0', 'font-size': '18px' }}>Броней: {data.owned_reservations.length}</p>
                    <p style={{ 'margin': '0', 'font-size': '18px' }}>Отзывов: {data.owned_reviews.length}</p>
                  </>
                :
                  <></>
                }
                <Flex gap="4px 0" wrap style={{ 'margin-top': '10px' }}>
                  {userStatus === 'Lessor'?
                    <>
                      <Tag icon={<StarOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                        Суперхозяин
                      </Tag>
                      <Tag icon={<StarOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                        Идеальная чистота
                      </Tag>
                    </>
                  :
                    <>
                      {data.owned_reservations.length > 23?
                      <Tag icon={<StarOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                        Путешественик
                      </Tag>
                      :
                      <></>}
                      {data.owned_reviews.length >= 10?
                      <Tag icon={<StarOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                        Ревизор
                      </Tag>
                      :<></>}
                    </>
                  }
                </Flex>
              </div>
              <Flex vertical style={{ 'margin-left': '5%', 'margin-top': '50px', 'width': '90%' }}>
                {userStatus === 'Lessor' ?
                  <Button style={{ 'width': '100%' }} onClick={() => { setIsOpenCreateAds(true) }}>Разместить объявление</Button>
                  : <></>}
                <Button style={{ 'margin-top': '13px', 'width': '100%' }} onClick={() => { setIsOpenUpdateProfile(true) }}>Обновить профиль</Button>
                <Popconfirm
                  placement="right"
                  title="Удалить профиль"
                  description="Уверены что хотите удалить профиль?"
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button style={{ 'margin-top': '13px', 'width': '100%' }}>Удалить профиль</Button>
                </Popconfirm>
                <Button style={{ 'margin-top': '13px', 'width': '100%' }} type='primary' onClick={logout}>Выйти</Button>
              </Flex>
            </Flex>
          </div>
        </div>
        {
          data.groups[0] == 1 ?
            <div className='owner_ads_wrapper'>
              <LessorList adsListData={data.owned_ads} />
            </div>
            :
            <div className='favourites_ads_wrapper'>
              <Flex>
                <Segmented
                  // size='large'
                  style={{ 'margin-left': '40px', 'margin-top': '2vh', 'margin-bottom': '10px' }}
                  options={['Все', 'Завершено', 'Не завершено']}
                  onChange={(value) => {
                    console.log(value);
                  }}
                />
              </Flex>
              <RentorList reservationsListData={data.owned_reservations} />
            </div>
        }
      </div>
      <CreateAds isOpenCreateAds={isOpenCreateAds} setIsOpenCreateAds={setIsOpenCreateAds} />
      <UpdateProfile isOpenUpdateProfile={isOpenUpdateProfile} setIsOpenUpdateProfile={setIsOpenUpdateProfile} />
    </>
  );
}

export default Profile;