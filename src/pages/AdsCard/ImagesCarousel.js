import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImagesCarousel = ({imgSrc}) => {
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
          <img src={imgSrc} alt='slide-1' />
        </div>
        <div>
          <img src={imgSrc} alt='slide-2' />
        </div>
        <div>
          <img src={imgSrc} alt='slide-3' />
        </div>
        <div>
          <img src={imgSrc} alt='slide-3' />
        </div>
        <div>
          <img src={imgSrc} alt='slide-3' />
        </div>
        <div>
          <img src={imgSrc} alt='slide-3' />
        </div>
        <div>
          <img src={imgSrc} alt='slide-3' />
        </div>
      </Slider>
    </div>
  );
};

export default ImagesCarousel;
