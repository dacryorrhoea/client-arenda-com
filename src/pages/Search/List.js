import { Link } from "react-router-dom";
// import { getAccessToken } from "../../utils/requests";
import axios from "axios";
import Button from '@mui/material/Button'
import { useState } from "react";

const serverUrl = 'http://localhost:8000/'

function List({ adsListData, userInfo, userListFavorites, getUserListFavorites}) {
  const postAddToFavorite = (id) => {
    axios.post(serverUrl + "api/token/refresh/", {
      refresh: userInfo.refresh_token
    })
    .then((res) => {
      axios.post(serverUrl + "api/user/manage/favorite/",
      {
        ad_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${res.data.access}`
        }
      })
      .then((res_in) => {
        console.log('добавленно в избранное')
        // getUserListFavorites()
      })
      .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }

  return (
    <>
      {(() => {
        const data = adsListData.map((result) => ({
          id: result.id,
          rating: result.rating.sum_rating / result.rating.count_reviews,
          count_reviews: result.rating.count_reviews,
          img_src: result.img_src,
          address: result.address,
          price: result.price,
          short_desc: result.short_desc
        }));

        const elements = []

        data.forEach(ad => {
          if (ad.category !== null) {
            elements.push(
              <div className='view_block' key={ad.id}>
                <img src={ad.img_src} />
                <div className="ad_info_block">
                  <h4>{ad.short_desc}</h4>
                  <p>
                    <span>{ad.address}</span>
                  </p>
                  <p>
                    <span>рейтинг: {ad.rating}</span>
                    <span>отзывов {ad.count_reviews}</span>
                  </p>
                  <p>
                    <span>Цена за сутки: {ad.price} руб.</span>
                  </p>
                  {/* <p>
                    <span>На ваш срок: {ad.price * 3} руб.</span>
                  </p> */}
                </div> 
                <div className="item_link">
                  <Link className="link" to={`/search/ads/${ad.id}`}>Подробнее</Link>
                  <button
                    type="submit"
                    className="link"
                    onClick={(() => {postAddToFavorite(ad.id)})}>
                    {userListFavorites.includes(ad.id)? 'Уже в избранном': 'Добавить в избранное'}
                  </button>
                  {/* <Button
                    onClick={() => {
                      postAddToFavorite();
                    }}
                  >
                    Click me
                  </Button> */}

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