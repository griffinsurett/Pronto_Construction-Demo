import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const StyledSlider = styled(Slider)`
  .slick-list {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 0 auto;
  }

  .slick-track {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-slide {
    display: flex !important;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: auto !important;
    outline: none;
  }

  .slick-prev,
  .slick-next {
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
    color: white;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%; /* Center vertically */
    transform: translateY(-50%);
    z-index: 2; /* Ensure they appear above the slides */
    cursor: pointer;
  }

  .slick-prev {
    left: -50px; /* Position on the left */
  }

  .slick-next {
    right: -50px; /* Position on the right */
  }

  .slick-prev:hover,
  .slick-next:hover {
    background-color: rgba(0, 0, 0, 0.8); /* Darker background on hover */
  }

  .slick-dots {
    position: relative;
    bottom: -20px;
    text-align: center;
  }
`;

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
  <div className="slick-prev" onClick={onClick}>
    <FontAwesomeIcon icon={faChevronLeft} />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className="slick-next" onClick={onClick}>
    <FontAwesomeIcon icon={faChevronRight} />
  </div>
);

const Carousel = ({ slides }) => {
  // Only render the carousel if there are slides
  if (!slides || slides.length === 0) {
    return null; // Don't render anything if no slides are provided
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1,
    adaptiveHeight: true, // Adjust height based on content
    arrows: true, // Enable navigation arrows
    prevArrow: <PrevArrow />, // Use custom "Previous" arrow
    nextArrow: <NextArrow />, // Use custom "Next" arrow
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <StyledSlider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {slide}
          </div>
        ))}
      </StyledSlider>
    </div>
  );
};

export default Carousel;

