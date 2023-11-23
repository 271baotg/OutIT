import React from "react";
import Slider from "react-slick";
import SliderItem from "./SliderItem";
import styled from "styled-components";
import { Target } from "../../../model/Target";

interface componentProps {
  data: Target[];
}

const ConstraintSlider: React.FC<componentProps> = (props) => {
  var settings = {
    infinite: false,
    adaptiveHeight: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: false, // Set arrows to false to hide them
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {props.data
          .sort((a, b) => b.total - a.total)
          .map((target) => (
            <SliderItem data={target} />
          ))}
      </Slider>
    </div>
  );
};

export default ConstraintSlider;
