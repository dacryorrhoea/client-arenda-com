import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Map, Placemark } from '@pbe/react-yandex-maps';
import { Rate, Button, Avatar, Tag, Flex, Calendar, Badge} from 'antd';
import {
  SearchOutlined, HeartOutlined, CloseCircleOutlined, EnvironmentOutlined,
  ThunderboltOutlined, SmileOutlined, StarOutlined, StarFilled, CheckCircleFilled,
  CloseCircleFilled, ClockCircleOutlined, FrownOutlined, MehOutlined
} from '@ant-design/icons';

import './AdCard.css';
import Booking from './Booking';
import ImagesCarousel from './ImagesCarousel';
import ListReviews from './ListReviews';
import dayjs from 'dayjs';

const serverUrl = 'http://localhost:8000/'

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

function AdCard() {
  const [loadingStatus, setLoadingStatus] = useState(false)

  const { ad_id } = useParams();
  const [adData, setAdData] = useState()

  useEffect(() => {
    getAdData(ad_id)
  }, [])

  const getAdData = (id) => {
    axios.get(`${serverUrl}api/ads/${id}/`)
      .then((res) => {
        setAdData(res.data)
        setLoadingStatus(true)
      }).catch((err) => {
        console.error(err);
      });
  }
  
  const getListData = (current) => {
    let listData = [];
    for (let i in adData.reservations) {
      if (dayjs(i.begin_lease)['$d'] === current['$d']) {
        console.log('pip')
      }
    }
    
    return listData || [];
  };

  // из за этой залупы всё может сильно залагать  
  const cellRender = (current, info) => {
    const element = []
    for (let i in adData.reservations) {
      const begin = dayjs(adData.reservations[i].begin_lease)
      const end = dayjs(adData.reservations[i].end_lease)
      if (current < dayjs().subtract(1, 'day') && end < dayjs().subtract(1, 'day')) return info.defaultNode;

      if (begin['$y'] === current['$y'] && begin['$M'] === current['$M'] && begin['$D'] === current['$D']) {
        element.push(<div style={{'width':'50%', 'height':'100%', 'background-color':'#ed0e42', 'position':'absolute', 'top':'0', 'right':'0','z-index':'-1','border-top-right-radius':'10px','border-bottom-right-radius':'10px'}}>
          
        </div>)
      }

      if (end['$y'] === current['$y'] && end['$M'] === current['$M'] && end['$D'] === current['$D']) {
        element.push(<div style={{'width':'50%', 'height':'100%', 'background-color':'#ed0e42', 'position':'absolute', 'top':'0', 'left':'0','z-index':'-1','border-top-left-radius':'10px','border-bottom-left-radius':'10px'}}>
          
        </div>)
      } 

      let a = begin.add(1, 'day')
      let b = begin.add(1, 'day')
      while (b < end) {
        if (b['$y'] === current['$y'] && b['$M'] === current['$M'] && b['$D'] === current['$D']) {
          element.push(<div style={{'width':'100%', 'height':'100%', 'background-color':'#ed0e42', 'position':'absolute', 'top':'0', 'z-index':'-1','border-radius':'10px'}}>
            
          </div>)
          b = end
        }
        a = b.add(1, 'day')
        b = a
      }
    }
    if (element) {
      return element;
    } else {
      return info.defaultNode;
    }
  };

  if (!loadingStatus) {
    return (
      <></>
    )
  }

  return (
    <div className='ad_card_wrapper'>
      <div className='ad_card_info_wrapper'>
        {/* краткое описание в качестве названия */}
        <div className='first info_block'>
          <h3 style={{ 'font-size': '29px', 'font-weight': '700' }}>{adData.short_desc}</h3>
          <p>
            <span style={{ 'font-size': '17px', 'font-weight': '700', 'margin-right': '6px' }}>
              <StarFilled style={{ 'color': '#ed0e42', 'margin-right': '3px' }} />
              {~~((adData.rating.sum_rating / adData.rating.count_reviews) / 2)}/5
            </span>
            <span style={{ 'margin-right': '20px' }}>{adData.rating.count_reviews} отзывов</span>
            <span style={{ 'margin-right': '10px', 'font-weight': '600' }}>{adData.address}</span>
            <a href='' style={{ 'font-size': '15px' }}>показать на карте</a>
          </p>
        </div>

        {/* описание */}
        <div className='info_block' style={{ 'margin-top': '0px' }}>
          <ImagesCarousel imgSrc={adData.img_src} />
          <div className='description_block'>
            <h3 style={{ 'margin-bottom': '0' }}>{adData.type_flats}<span style={{ 'font-weight': '800' }}>{adData.square}м<sup>2</sup></span></h3>
            <p>
              <span style={{ 'font-size': '17px', 'font-weight': '600' }}>{adData.params}</span>
            </p>
            <p style={{ 'font-size': '16px', 'line-height': '1.3' }}>
              {adData.description}
            </p>
            <p style={{ 'font-size': '18px', 'font-weight': '700', 'margin': '0', 'margin-top': '10px' }}>Спальные места: {adData.sleeping_places}</p>
            <p style={{ 'font-size': '16px', 'font-weight': '500', 'margin': '0' }}>{adData.beds_info}</p>
          </div>
        </div>

        {/* Инфа о владельце */}
        <div className='info_block' style={{ 'display': 'flex' }}>
          <Link>
            <Avatar size={100} src={<img src='https://i.pinimg.com/564x/cb/69/09/cb6909a7c9d2e4d6f1d4fa0dc2e5a066.jpg' alt="avatar" />} />
          </Link>
          <div className='lessor_info_block'>
            <h5 style={{ 'font-weight': '600' }}>
              {adData.owner.first_name} {adData.owner.last_name}
            </h5>
            <Flex gap="4px 0" wrap>
              <Tag icon={<StarOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                Суперхозяин
              </Tag>
              <Tag icon={<StarOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                Идеальная чистота
              </Tag>
              <Tag icon={<ClockCircleOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                Давно на сайте
              </Tag>
              <Tag icon={<StarOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                Арбузер
              </Tag>
              <Tag icon={<StarOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                Арбузер
              </Tag>
            </Flex>
            <p style={{ 'margin-top': '10px', 'margin-bottom': '0' }}>
              <span>Объявлений: <span style={{ 'font-weight': '600' }}>10</span></span>
              <span>Бронирований: <span style={{ 'font-weight': '600' }}>300</span></span>
              <span>Рэйтинг пользователя: <span style={{ 'font-weight': '600' }}>9</span></span>
            </p>
          </div>
        </div>

        {/* Правила */}
        <div className='info_block'>
          <h3>Правила объекта размещения</h3>
          <p style={{ 'display': 'flex' }}>
            <div style={{ 'width': '100px', 'margin-right': '150px' }}>
              <span style={{ 'width': '100px', 'font-size': '19px', 'font-weight': '600' }}>Заезд</span> после {adData.clock_entry.slice(-5)}
            </div>
            <div style={{ 'width': '80px', 'margin-right': '150px' }}>
              <span style={{ 'width': '80px', 'font-size': '19px', 'font-weight': '600' }}>Отъезд</span> до {adData.clock_leave.slice(-5)}
            </div>
            <div style={{ 'width': '180px' }}>
              <span style={{ 'width': '180px', 'font-size': '19px', 'font-weight': '600' }}>Срок размещения</span> от {adData.min_length_of_stay} - до {adData.max_length_of_stay} суток
            </div>
          </p>
          <p>
            {adData.animal_check ?
              <><CheckCircleFilled style={{ 'font-size': '23px', 'color': '#417505' }} /><span style={{ 'margin-left': '-7px' }}>Можно с питомцами по согласованию с хозяином жилья</span></> :
              <><CloseCircleFilled style={{ 'font-size': '23px', 'color': '#d80d0d' }} /><span style={{ 'margin-left': '-8px' }}>С питомцами нельзя</span></>}
          </p>
          <p>
            {adData.smoking_check ?
              <><CheckCircleFilled style={{ 'font-size': '23px', 'color': '#417505' }} /><span style={{ 'margin-left': '-7px' }}>Курение разрешено</span></> :
              <><CloseCircleFilled style={{ 'font-size': '23px', 'color': '#d80d0d' }} /><span style={{ 'margin-left': '-8px' }}>Курение запрещено</span></>}
          </p>
          <p>
            {adData.party_check ?
              <><CheckCircleFilled style={{ 'font-size': '23px', 'color': '#417505' }} /><span style={{ 'margin-left': '-7px' }}>Вечеринки и мероприятия разрешены</span></> :
              <><CloseCircleFilled style={{ 'font-size': '23px', 'color': '#d80d0d' }} /><span style={{ 'margin-left': '-8px' }}>Без вечеринок и мероприятий</span></>}
          </p>
          <p>
            {adData.docs_check ?
              <><CheckCircleFilled style={{ 'font-size': '23px', 'color': '#417505' }} /><span style={{ 'margin-left': '-7px' }}>Владелец предоставляет отчетные документы о проживании по согласованию</span></> :
              <><CloseCircleFilled style={{ 'font-size': '23px', 'color': '#d80d0d' }} /><span style={{ 'margin-left': '-8px' }}>Владелец не предоставляет документы о проживании</span></>}
          </p>
          <p>
            {adData.kids_check ?
              <><CheckCircleFilled style={{ 'font-size': '23px', 'color': '#417505' }} /><span style={{ 'margin-left': '-7px' }}>Можно с детьми любого возраста </span></> :
              <><CloseCircleFilled style={{ 'font-size': '23px', 'color': '#d80d0d' }} /><span style={{ 'margin-left': '-8px' }}>Нельзя с детьми младше 12 лет</span></>}
          </p>
        </div>

        {/* Удобства */}
        <div className='info_block'>
          <h3>Основные удобства</h3>
          <p style={{ 'width': '50%', 'display': 'inline-block' }}>
            {adData.wifi ?
              <><CheckCircleFilled style={{ 'font-size': '23px', 'color': '#417505' }} /><span style={{ 'margin-left': '-7px' }}>Есть вай-фай</span></> :
              <><CloseCircleFilled style={{ 'font-size': '23px', 'color': '#ed0e42' }} /><span style={{ 'margin-left': '-8px' }}>Без вай-фая</span></>}
          </p>
          <p style={{ 'width': '50%', 'display': 'inline-block' }}>
            {adData.towel ?
              <><CheckCircleFilled style={{ 'font-size': '23px', 'color': '#417505' }} /><span style={{ 'margin-left': '-7px' }}>Есть полотенце</span></> :
              <><CloseCircleFilled style={{ 'font-size': '23px', 'color': '#ed0e42' }} /><span style={{ 'margin-left': '-8px' }}>Без полотенец</span></>}
          </p>
          <p style={{ 'width': '50%', 'display': 'inline-block' }}>
            {adData.bed_linen ?
              <><CheckCircleFilled style={{ 'font-size': '23px', 'color': '#417505' }} /><span style={{ 'margin-left': '-7px' }}>Есть постельное бельё</span></> :
              <><CloseCircleFilled style={{ 'font-size': '23px', 'color': '#ed0e42' }} /><span style={{ 'margin-left': '-8px' }}>Без постельного белья</span></>}
          </p>
          <p style={{ 'width': '50%', 'display': 'inline-block' }}>
            {adData.tv ?
              <><CheckCircleFilled style={{ 'font-size': '23px', 'color': '#417505' }} /><span style={{ 'margin-left': '-7px' }}>Есть телевизор</span></> :
              <><CloseCircleFilled style={{ 'font-size': '23px', 'color': '#ed0e42' }} /><span style={{ 'margin-left': '-8px' }}>Без телевизора</span></>}
          </p>
          <p style={{ 'width': '50%', 'display': 'inline-block' }}>
            {adData.microwave ?
              <><CheckCircleFilled style={{ 'font-size': '23px', 'color': '#417505' }} /><span style={{ 'margin-left': '-7px' }}>Есть микроволновка</span></> :
              <><CloseCircleFilled style={{ 'font-size': '23px', 'color': '#ed0e42' }} /><span style={{ 'margin-left': '-8px' }}>Без микроволновки</span></>}
          </p>
          <p style={{ 'width': '50%', 'display': 'inline-block' }}>
            {adData.electric_kettle ?
              <><CheckCircleFilled style={{ 'font-size': '23px', 'color': '#417505' }} /><span style={{ 'margin-left': '-7px' }}>Есть электрический чайник</span></> :
              <><CloseCircleFilled style={{ 'font-size': '23px', 'color': '#ed0e42' }} /><span style={{ 'margin-left': '-8px' }}>Без электрического чайника</span></>}
          </p>
          <p style={{ 'width': '50%', 'display': 'inline-block' }}>
            {adData.balcony ?
              <><CheckCircleFilled style={{ 'font-size': '23px', 'color': '#417505' }} /><span style={{ 'margin-left': '-7px' }}>Есть балкон/лоджия</span></> :
              <><CloseCircleFilled style={{ 'font-size': '23px', 'color': '#ed0e42' }} /><span style={{ 'margin-left': '-8px' }}>Без балкона/лоджии</span></>}
          </p>
        </div>

        <div className='info_block'>
          <h3>Забронированые и свободные дни</h3>
          <Calendar
          style={{'color':'white'}}
            fullscreen={false}
            disabledDate={(current) => {return current && current < dayjs().subtract(1, 'day').endOf('day')}}
            defaultValue={dayjs()}
            cellRender={cellRender}
          />
        </div>

        {/* отзывы */}
        <div className='info_block'>
          <h3>Оценка гостей
            <span style={{ 'font-size': '22px', 'font-weight': '700', 'margin-left': '0' }}>
              <StarFilled style={{ 'font-size': '22px', 'color': '#ed0e42', 'margin-right': '3px' }} />
              {~~((adData.rating.sum_rating / adData.rating.count_reviews) / 2)}/5
            </span>
            <span style={{ 'margin-left': '12px', 'font-size': '16px', 'font-weight': '500' }}>
              отзывов: {adData.rating.count_reviews}
            </span>
          </h3>
          <div style={{}}>
            <div style={{ 'width': '48%', 'display': 'inline-block', 'margin':'1%' }}><div style={{ 'display': 'flex' }}>
                <span style={{'font-weight':'600'}}>Чистота</span>                
                <Rate style={{ 'width': '130px', 'color': '#ed0e42', 'margin-left':'auto'}} disabled defaultValue={4} character={({ index = 0 }) => customIcons[index + 1]} />
            </div></div>
            <div style={{ 'width': '48%', 'display': 'inline-block', 'margin':'1%' }}><div style={{ 'display': 'flex' }}>
                <span style={{'font-weight':'600'}}>Соответствие фото</span>                
                <Rate style={{ 'width': '130px', 'color': '#ed0e42', 'margin-left':'auto'}} disabled defaultValue={4} character={({ index = 0 }) => customIcons[index + 1]} />
            </div></div>
            <div style={{ 'width': '48%', 'display': 'inline-block', 'margin':'1%' }}><div style={{ 'display': 'flex' }}>
                <span style={{'font-weight':'600'}}>Своевременность заселения</span>                
                <Rate style={{ 'width': '130px', 'color': '#ed0e42', 'margin-left':'auto'}} disabled defaultValue={2} character={({ index = 0 }) => customIcons[index + 1]} />
            </div></div>
            <div style={{ 'width': '48%', 'display': 'inline-block', 'margin':'1%' }}><div style={{ 'display': 'flex' }}>
                <span style={{'font-weight':'600'}}>Цена - качество</span>                
                <Rate style={{ 'width': '130px', 'color': '#ed0e42', 'margin-left':'auto'}} disabled defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} />
            </div></div>
            <div style={{ 'width': '48%', 'display': 'inline-block', 'margin':'1%' }}><div style={{ 'display': 'flex' }}>
                <span style={{'font-weight':'600'}}>Расположение</span>                
                <Rate style={{ 'width': '130px', 'color': '#ed0e42', 'margin-left':'auto'}} disabled defaultValue={1} character={({ index = 0 }) => customIcons[index + 1]} />
            </div></div>
            <div style={{ 'width': '48%', 'display': 'inline-block', 'margin':'1%' }}><div style={{ 'display': 'flex' }}>
                <span style={{'font-weight':'600'}}>Качество обслуживания</span>                
                <Rate style={{ 'width': '130px', 'color': '#ed0e42', 'margin-left':'auto'}} disabled defaultValue={5} character={({ index = 0 }) => customIcons[index + 1]} />
            </div></div>
          </div>
          <ListReviews reviewsListData={adData.reviews} />
          <Button style={{'margin-left':'78px','margin-top':'35px'}}>Посмотреть все отзывы</Button>
        </div>

        {/* карта */}
        <div className='info_block' >
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} className='yandex_maps'>
            <Placemark defaultGeometry={[55.751574, 37.573856]} />
          </Map>
          <div style={{'height':'500px'}}>

          </div>
        </div>
      </div>
      <div className='booking_form_wrapper'>
        <Booking adCardId={adData.id} adReservations={adData.reservations}/>
      </div>
    </div>
  );
}

export default AdCard;