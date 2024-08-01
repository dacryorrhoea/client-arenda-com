import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Map, Placemark} from '@pbe/react-yandex-maps';

import './AdCard.css';
import Booking from './Booking';
import ImagesCarousel from './ImagesCarousel';
import ListReviews from './ListReviews';

const serverUrl = 'http://localhost:8000/'

function AdCard() {
  const [loadingStatus, setLoadingStatus] = useState(false)

  const {ad_id} = useParams();
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

  if (!loadingStatus) {
    return (
      <></>
    )
  }

  return (
    <div className='ad_card_wrapper'>
      <div className='ad_card_info_wrapper'>
        <div className='info_block'>
          <h2>Это объявление о аренде квартиры</h2>
          <p>
            <span>рейтинг: 9.5</span>
            <span>69 отзывов</span>
            <span>{adData.address}</span>
          </p>
        </div>
        <div className='info_block'>
          <ImagesCarousel/>
          <div className='description_block'>
            <h4>Квартира такая такая то <span>69М</span></h4>
            <p>
              <span>3 комнаты</span>
              <span>3 комнаты</span>
              <span>3 комнаты</span>
              <span>3 топора</span>
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis autem possimus voluptatem amet voluptas officiis excepturi aut explicabo id fugit suscipit pariatur quisquam temporibus error ut necessitatibus sed perspiciatis quibusdam accusantium, quasi culpa repellat similique. A possimus quis, vel, aspernatur animi nesciunt quo, accusamus optio aliquam magnam ipsa dignissimos. Illum in, corporis perferendis dolor, placeat distinctio quasi, a corrupti veniam molestiae fugiat. Fugit error veritatis natus mollitia possimus totam, nam enim repellendus saepe alias id ea quisquam autem et tenetur recusandae ipsa vitae nobis aut explicabo velit nisi odio quasi eum! Neque nihil provident aspernatur magnam mollitia ipsa reiciendis asperiores!
            </p>
          </div>
        </div>
        <div className='info_block'>
          <h4>Правила объекта размещения:</h4>
        </div>
        <div className='info_block'>
          <h4>Основные удобства:</h4>
        </div>
        <div className='info_block'>
          <h4>Оценка гостей:
            <span>9.5 баллов</span>
            <span>69 отзывов</span>
          </h4>
          <ListReviews reviewsListData={''}/>
        </div>
        <div className='info_block'>
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} className='yandex_maps'>
            <Placemark defaultGeometry={[55.751574, 37.573856]} />
          </Map>
        </div>
        <div className='info_block'>
          <img src="https://static.sutochno.ru/doc/files/users/0/811/104/medium/635e37415d027.jpg" alt="img" className='lessor_img' />
          <div className='lessor_info_block'>
            <h4>Сергей Сергеевич</h4>
            <span>Хозяин не лох и даже не дырявый</span><br />
            <span>Ho мы можем и ошибаться</span>
          </div>
        </div>
      </div>
      <div className='booking_form_wrapper'>
        <Booking/>
      </div>
    </div>
  );
}

export default AdCard;