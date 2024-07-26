import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { get } from "mobx";

const serverUrl = 'http://localhost:8000/api/ads/'

function List({ filterAds }) {
  const [adsList, setAdsList] = useState([]);

  useEffect(() => {
    getAdsList(filterAds);
  }, [])

  const getAdsList = (filter) => {
    const fullUrl = `?price_min=${filter.min_price}&price_max=${filter.max_price}`;
    console.log(fullUrl)
    axios.get(serverUrl + fullUrl)
    .then((res) => {
      const data = res.data.map((result) => ({
        address: result.address,
        price: result.price, 
        img: result.img_src,
        description: result.short_desc
      }));

      const elements = []

      data.forEach(ad => {
        if (ad.category !== null) {
          elements.push(
            <div className='view_block'>
              <img src='https://www.anilibria.tv/storage/releases/posters/9725/8RIUaBHZVcX6BgTF__744550fa135767afb7e429ccda3d904e.jpg' />
              <p>{ad.price}$</p>
              <div className="item_link">
                {/* <Link className="link" to={`/search/ads/${ad.id}`}>Посмотреть</Link> */}
              </div>
            </div>
          );
        }
      });

      setAdsList(elements);
    })
  }

  return (
    <>
      <button onClick={() => {getAdsList(filterAds)}}>обновить</button>
      {adsList}
    </>
  )
}

export default List;