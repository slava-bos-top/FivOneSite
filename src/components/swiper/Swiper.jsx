import React, { useState } from "react";
import "./Swiper.css";

const slides = [
  "https://optim.tildacdn.one/tild3863-3934-4337-b637-633865623634/-/resize/192x/-/format/webp/photo543141007240525.jpg.webp",
  "https://optim.tildacdn.one/tild6563-3532-4235-b832-303961333737/-/resize/192x/-/format/webp/photo543141007240525.jpg.webp",
  "https://optim.tildacdn.one/tild6135-6666-4765-b332-366163333264/-/resize/192x/-/format/webp/photo543141007240525.jpg.webp",
  "https://optim.tildacdn.one/tild6431-3462-4062-b134-666234356434/-/resize/192x/-/format/webp/photo543141007240525.jpg.webp",
  "https://optim.tildacdn.one/tild3133-3062-4530-b139-393763316432/-/resize/192x/-/format/webp/photo543141007240525.jpg.webp",
  "https://optim.tildacdn.one/tild3564-3339-4931-b738-306139643436/-/resize/192x/-/format/webp/photo543141007240525.jpg.webp",
  "https://optim.tildacdn.one/tild3262-6438-4238-b035-363465383736/-/resize/192x/-/format/webp/photo543141007240525.jpg.webp",
  "https://optim.tildacdn.one/tild6164-3637-4132-a164-316562616161/-/resize/192x/-/format/webp/photo543141007240525.jpg.webp",
  "https://optim.tildacdn.one/tild6539-3061-4735-a334-303135626137/-/resize/192x/-/format/webp/photo543141007240525.jpg.webp",
  "https://optim.tildacdn.one/tild3662-3338-4633-a233-366461653732/-/resize/192x/-/format/webp/photo543141007240525.jpg.webp",
  "https://optim.tildacdn.one/tild6464-3264-4264-a264-373938636532/-/resize/192x/-/format/webp/photo543141007240525.jpg.webp",
  "https://optim.tildacdn.one/tild6638-3937-4065-b837-653634653261/-/resize/192x/-/format/webp/photo543141007240525.jpg.webp"
];

const Swiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="swiper-container">
      <button className="swiper-button left-slide" onClick={prevSlide}>
        &#8592;
      </button>

      <div className="swiper-slide" style={{marginTop: "50px"}}>
        <img src={slides[currentIndex]} alt={`slide-${currentIndex}`} style={{marginTop: "40px"}}/>
      </div>

      <button className="swiper-button right-slide" onClick={nextSlide}>
        &#8594;
      </button>
    </div>
  );
};

export default Swiper;