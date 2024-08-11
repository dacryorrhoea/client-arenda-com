import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { Card } from 'antd';
import { useEffect, useState } from 'react';

function YandexMaps({ adsListData }) {
  const [listCoordinate, setListCoordinate] = useState([])

  const createMark = (ymaps) => {
    const data = adsListData.map((result) => ({
      id: result.id,
      img_src: result.img_src,
      address: result.address,
      price: result.price,
      short_desc: result.short_desc,
    }));

    const elements = []
      data.forEach(ad => {
        ymaps.geocode(ad.address).then(res => {
          elements.push(
            <Placemark
              geometry={res.geoObjects.get(0).geometry.getCoordinates()}
              properties={{
                balloonContent: `
                <img src='${ad.img_src}' style='width: 320px'/>
                <p style='width: 320px'>${ad.short_desc}</p>
                <p style='width: 320px'>${ad.address}</p>
                `,
                hintContent: ad.address,
                iconCaption: `${ad.price} ₽`
              }}
              options={{
                preset: 'islands#redCircleDotIconWithCaption',
                iconCaptionMaxWidth: '50'
              }}
            />
          )
        })
      });
      setListCoordinate(elements)
  }

  return (
    <Map
      defaultState={{
        center: [55.75, 37.57],
        zoom: 11,
      }}
      modules={['geocode']}
      onLoad={(ymaps) => createMark(ymaps)}
      className='yandex_maps'
    >
      {listCoordinate}
    </Map>
  );
}

export default YandexMaps;