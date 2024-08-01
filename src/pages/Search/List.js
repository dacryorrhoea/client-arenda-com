import { Link } from "react-router-dom";
function List({ adsListData }) {
  return (
    <>
      {(() => {
        console.log('vivoju spisok')
        const data = adsListData.map((result) => ({
          id: result.id,
          address: result.address,
          price: result.price,
          description: result.description
        }));

        const elements = []

        data.forEach(ad => {
          if (ad.category !== null) {
            elements.push(
              <div className='view_block' key={ad.id}>
                <img src='https://www.anilibria.tv/storage/releases/posters/9725/8RIUaBHZVcX6BgTF__744550fa135767afb7e429ccda3d904e.jpg' />
                <div className="ad_info_block">
                  <h2>{ad.description}</h2>
                  <p>
                    <span>{ad.address} ул.Молодая д.69</span>
                  </p>
                  <p>
                    <span>рейтинг: 9.5</span>
                    <span>отзывов 300</span>
                  </p>
                  <p>
                    <span>Цена за сутки: {ad.price} руб.</span>
                  </p>
                  <p>
                    <span>На ваш срок: {ad.price * 3} руб.</span>
                  </p>
                </div> 
                <div className="item_link">
                  <Link className="link" to={`/search/ads/${ad.id}`}>Подробнее</Link>
                  <button type="submit" className="link">Добавить в избранное</button>
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