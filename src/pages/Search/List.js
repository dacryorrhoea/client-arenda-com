import { Link } from "react-router-dom";
// import { getAccessToken } from "../../utils/requests";
import axios from "axios";
import { useState } from "react";
import { Card, Col, Row, Flex, Typography, Button, Rate} from "antd";

import { SearchOutlined, HeartOutlined, CloseCircleOutlined, EnvironmentOutlined,
  ThunderboltOutlined, SmileOutlined, StarOutlined
 } from '@ant-design/icons';
import { useBookingParams } from "../../utils/hooks/useBookingParams";
import { useProfile } from "../../utils/hooks/useProfile";
import PageDownloadWaiting from "../../components/PageDownloadWaiting";

const serverUrl = 'http://localhost:8000/'

function List({ adsListData, formatCalculatingPrice }) {
  // const {data, isLoading} = useProfile()
  const [bookingParams] = useBookingParams()

  // if (isLoading) {
  //   return (
  //     <div style={{'width':'100%','height':'95vh'}}>
  //       <div style={{'margin-left':'50%', 'margin-top':'40%'}}>
  //         <PageDownloadWaiting/>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <>
      {(() => {
        const mapeddata = adsListData.map((result) => ({
          id: result.id,
          rating: result.rating ? (result.rating.sum_rating / result.rating.count_reviews + 1.5): 0,
          count_reviews: result.rating ? result.rating.count_reviews : 0,
          images: result.images,
          min: result.min_length_of_stay,
          max: result.max_length_of_stay,
          address: result.address,
          owner: result.owner,
          long_term: result.long_term,
          fast_booking: result.fast_booking,
          cash_back: result.cash_back,
          price: result.price,
          short_desc: result.short_desc,
          type_flats: result.type_flats,
          square: result.square,
          count_people: result.count_people,
          count_beds: result.count_beds,
        }));

        

        const elements = []

        mapeddata.forEach(ad => {
          if (ad.category !== null) {
            console.log(ad.rating)
            elements.push(
              <div className='view_block' key={ad.id}>
                <img src={ad.images[0].src} />
                <div className="ad_info_block">
                  <p style={{ 'font-size': '15px', 'font-weight':'500','margin-bottom': '2px'}}>{ad.type_flats}</p>
                  <h5 style={{ 'font-weight': '600' }}>{ad.short_desc}</h5>
                  <p style={{ 'font-size': '15px','font-weight':'500','margin-top': '2px'}}>
                    <span>{ad.square} м<sup>2</sup></span>
                    <span>{ad.count_people} гостя</span>
                    <span>{ad.count_beds} кровати</span>
                  </p>
                  <p className="address_line">
                    <span><EnvironmentOutlined style={{ 'font-size': '19px'}}/>{ad.address.slice(0, 40)}...</span>
                  </p>
                  <p className="rating">
                    <span>
                    <Rate
                      style={{ 'color': '#ed0e42'}}
                      disabled
                      defaultValue={ad.rating}
                      tooltips={['ужасно', 'плохо', 'нормально', 'хорошо', 'прекрасно']}
                    /></span>
                    <span style={{'font-size': '14px','font-weight':'600'}}> Отзывов: {ad.count_reviews}</span>
                  </p>
                </div>
                
                <div className="ad_achievements_and_price">
                  {bookingParams.days_lease > 1 ?
                    formatCalculatingPrice ?
                      <>
                        <p className="price"><span style={ad.id === 195 ? { 'color': '#ed0e42' } : {}}>{ad.price} ₽</span> за сутки</p>
                        <p style={{ 'font-size': '14px' }}><span> {ad.price * bookingParams.days_lease} ₽</span> за {bookingParams.days_lease} суток</p>
                      </>
                      :
                      <>
                        <p className="price"><span style={ad.id === 195 ? { 'color': '#ed0e42' } : {}}> {ad.price * bookingParams.days_lease} ₽</span> за {bookingParams.days_lease} суток</p>
                        <p style={{ 'font-size': '14px' }}><span>{ad.price} ₽</span> за сутки</p>
                      </>
                    :
                    <p className="price"><span style={ad.id === 195 ? { 'color': '#ed0e42' } : {}}>{ad.price} ₽</span> за сутки</p>
                  }
                  <p className="achievements">
                    {formatCalculatingPrice?
                      ad.cash_back?
                        <div className="achievement" style={{'background-color':'#ed0e42', 'color':'white'}}>
                          <SmileOutlined/> Кэшбэк {ad.cash_back}% = {~~(ad.price * (ad.cash_back/100))} ₽
                        </div>
                      :<></>
                    :
                      ad.cash_back?
                        <div className="achievement" style={{'background-color':'#ed0e42', 'color':'white'}}>
                          <SmileOutlined/> Кэшбэк {ad.cash_back}% = {~~(ad.price * bookingParams.days_lease * (ad.cash_back/100))} ₽
                        </div>
                      :<></>
                    }
                    {ad.owner.profile.super_lessor?
                      <div className="achievement"><StarOutlined /> Суперхозяин</div>
                    :<></>}
                    {ad.fast_booking?
                      <div className="achievement"><ThunderboltOutlined/> Быстрое бронирование</div>
                    :<></>}
                    {ad.max <= 3?
                      <div className="achievement"><CloseCircleOutlined style={{'color':'red'}}/> Длительное проживание</div>
                    :<></>}
                  </p>
                </div>
                <div className="item_link">
                  <Link className="link" to={`/search/ads/${ad.id}`} target="_blank"><SearchOutlined /></Link>
                </div>
              </div>
            );
          }
        });

        return elements;
      })()}
    </>
  )
}

export default List;