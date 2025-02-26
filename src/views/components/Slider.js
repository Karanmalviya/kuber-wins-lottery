import React from "react";
import { Link } from "react-router-dom";
import slider from "../json/slider.json";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function Slider({ props }) {
  return (
    <OwlCarousel
      className="owl-theme"
      loop
      margin={10}
      items={1}
      autoplay={true}
      nav={false}
      dots={false}
    >
      {slider.data.map((slide, index) => {
        return (
          <div key={index} className="item slider-item">
            {/* <img
              src="./assets/images/banner-card-bg.png"
              className="item slider-item"
            /> */}
            <div className="slider-item-container">
              <h2 className="mt-1">{slide.title}</h2>
              <p>{slide.descr}</p>
              <Link to={slide.link} className="btn btn-default">
                It's Easy to Join
              </Link>
            </div>
          </div>
        );
      })}
    </OwlCarousel>
  );
}
