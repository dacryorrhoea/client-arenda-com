import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Image } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const handleDragStart = (e) => e.preventDefault();

const ImagesCarousel = ({images}) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const elems = []
    images.forEach(element => {
      elems.push(
        <div style={{'height':'480px', 'width':'827px', 'display':'inline-block', 'text-align': 'center', 'overflow':'hidden'}}><Image  src={element.src} style={{'height':'480px', 'width':'auto'}}/></div>,
      )
    });
    setItems(elems)
  }, [])

  return (
    <div className='images_carousel'>
      <AliceCarousel
        mouseTracking
        // disableButtonsControls
        // disableDotsControls
        // autoPlay
        infinite
        animationDuration={1000}
        // autoPlayInterval={2200}
        items={items}
      />
    </div>
  );
};

export default ImagesCarousel;
