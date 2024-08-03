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

function AdCard({searchFilter, userInfo}) {
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
          <h2>{adData.type_flats}</h2>
          <p>
            <span>рейтинг: {adData.rating.sum_rating / adData.rating.count_reviews}</span>
            <span>{adData.rating.count_reviews} отзывов</span>
            <span>{adData.address}</span>
          </p>
        </div>
        <div className='info_block'>
          <ImagesCarousel imgSrc={adData.img_src}/>
          <div className='description_block'>
            <h4>{adData.short_desc}<span>{adData.square}м^2</span></h4>
            <p>
              <span>{adData.params}</span>
            </p>
            <p>
              {adData.description}
            </p>
          </div>
        </div>
        <div className='info_block'>
          <h4>Правила объекта размещения:</h4>
          <p><span>{adData.clock_entry}</span></p>
          <p><span>{adData.clock_leave}</span></p>
          <p>
            <span>{`Минимальный срок размещения: ${adData.min_length_of_stay} день`}</span>
            <span> - </span>
            <span>{`Максимальный срок размещения: ${adData.max_length_of_stay} дней`}</span>
          </p>
          <p>С животными можно? - {adData.animal_check? 'Да': 'Нет'}</p>
          <p>Курить можно? - {adData.smoking_check? 'Да': 'Нет'}</p>
          <p>Вечеринки можно? - {adData.party_check? 'Да': 'Нет'}</p>
          <p>Документы предоставят? - {adData.docs_check? 'Да': 'Нет'}</p>
          <p>С детьми можно? - {adData.kids_check? 'Да': 'Нет'}</p>
        </div>
        <div className='info_block'>
          <h4>Основные удобства:</h4>
          <p>Вай-фай? - {adData.wifi? 'Да': 'Нет'}</p>
          <p>{adData.towel? 'Да': 'Нет'}</p>
          <p>Постельное бельё? - {adData.bed_linen? 'Да': 'Нет'}</p>
          <p>Телевизор? - {adData.tv? 'Да': 'Нет'}</p>
          <p>Микроволновка? - {adData.microwave? 'Да': 'Нет'}</p>
          <p>Электрический чайник? - {adData.electric_kettle? 'Да': 'Нет'}</p>
          <p>Балкон/лоджия? - {adData.balcony? 'Да': 'Нет'}</p>
        </div>
        <div className='info_block'>
          <h4>Оценка гостей:
            <span>{adData.rating.sum_rating / adData.rating.count_reviews} баллов</span>
            <span>{adData.rating.count_reviews} отзывов</span>
          </h4>
          <ListReviews reviewsListData={adData.reviews}/>
        </div>
        <div className='info_block'>
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} className='yandex_maps'>
            <Placemark defaultGeometry={[55.751574, 37.573856]} />
          </Map>
        </div>
        <div className='info_block'>
          <img src="https://i.pinimg.com/564x/cb/69/09/cb6909a7c9d2e4d6f1d4fa0dc2e5a066.jpg" alt="img" className='lessor_img' />
          <div className='lessor_info_block'>
            <h4>{adData.owner.first_name} {adData.owner.last_name}</h4>
          </div>
        </div>
      </div>
      <div className='booking_form_wrapper'>
        <Booking userInfo={userInfo} adCardId={adData.id} searchFilter={searchFilter}/>
      </div>
    </div>
  );
}

export default AdCard;