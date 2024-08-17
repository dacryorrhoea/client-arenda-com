import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { Card } from 'antd';
import { useEffect, useState } from 'react';

function YandexMaps({ adsListData }) {
  const [list, setList] = useState()
  const [centerCoord, setCenterCoord] = useState([10.4, 10.6])

  useEffect(() => {
    createListMark()
    if (adsListData.length > 0) setCenterCoord([parseFloat(adsListData[0].address_lon), parseFloat(adsListData[0].address_lat)])
  }, [adsListData])

  const createListMark = () => {
    const data = adsListData.map((result) => ({
      id: result.id,
      lat: parseFloat(result.address_lat),
      lon: parseFloat(result.address_lon),
      images: result.images,
      address: result.address,
      price: result.price,
      short_desc: result.short_desc,
    }));

    const elements = []

    data.forEach(ad => {
      elements.push(
        <Placemark
          geometry={[ad.lon, ad.lat]}
          properties={{
            balloonContent: `
            <img src='${ad.images[0].src}' style='width: 320px'/>
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
    });

    console.log(elements)
    setList(elements)
  }

  return (
    <Map
      defaultState={{
        center: centerCoord,
        zoom: 11,
      }}
      modules={['geocode']}
      className='yandex_maps'
    >
      {list}
    </Map>
  );
}

export default YandexMaps;