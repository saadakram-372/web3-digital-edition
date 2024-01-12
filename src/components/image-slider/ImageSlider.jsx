import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

import "./ImageSlider.css";

export const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="slider">
      <div className="slides">
        {slides.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}>
              {index === current && (
                <img src={slide.Body} alt="edition-images" className="image" />
              )}
            </div>
          );
        })}
      </div>

      <div className="slider-arrows">
        {current !== 0 ? (
          <FontAwesomeIcon
            onClick={prevSlide}
            icon={faCircleArrowLeft}
            className="left-arrow"
          />
        ) : null}

        {current !== length - 1 ? (
          <FontAwesomeIcon
            onClick={nextSlide}
            icon={faCircleArrowRight}
            className="right-arrow"
          />
        ) : null}
      </div>
    </div>
  );
};
