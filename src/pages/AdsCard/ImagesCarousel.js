import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImagesCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='images_carousel'>
      <Slider {...settings}>
        <div>
          <img src='https://rule34.xxx//samples/2180/sample_89c1a658f2939034e5b164806c74f4a1.jpg?10818655' alt='slide-1' />
        </div>
        <div>
          <img src='https://rule34.xxx//samples/2180/sample_89c1a658f2939034e5b164806c74f4a1.jpg?10818655' alt='slide-2' />
        </div>
        <div>
          <img src='https://rule34.xxx//samples/2180/sample_89c1a658f2939034e5b164806c74f4a1.jpg?10818655' alt='slide-3' />
        </div>
      </Slider>
    </div>
  );
};

export default ImagesCarousel;
