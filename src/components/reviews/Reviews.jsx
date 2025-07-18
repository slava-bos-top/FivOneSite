import React from 'react';
import './Reviews.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// import franz from './images/franz.jpg';
// import temchenko from './images/temchenko.jpg';
// import shulyakovska from './images/shulyakovska.jpg';
// import herasymenko from './images/herasymenko.jpg';

const reviews = [
  {
    name: 'Віталій Франц',
    role: 'Студент курсу "Розвиток креативності" (15 років)',
    text: 'Уроки проходять цікаво! Для мене майже все нове. Виконую домашні завдання, бо вони прикольні і не нудні. Після курсу "Розвиток креативності" зрозумів, що хочу стати креативним менеджером і скоро ви побачите мої роботи на великих білбордах.',
    image: "https://optim.tildacdn.one/tild6234-3465-4334-b562-333264613865/-/cover/200x200/center/center/-/format/webp/e3.png.webp",
  },
  {
    name: 'Дарія Темченко',
    role: 'Студентка курсу "Сучасні технології" (47 років)',
    text: 'Мені сподобався формат подачі матеріалу. Навчаючись, паралельно передавала знання з курсу "Сучасні технології" дітям. Вони в захваті! Дуже просто, цікаво та практично!',
    image: "https://optim.tildacdn.one/tild3730-6131-4633-a465-323665656635/-/cover/200x200/center/center/-/format/webp/e2.jpg.webp",
  },
  {
    name: 'Олена Шуляковська',
    role: 'Мама студента Олеся (12 років). Курс "Фізика навколо нас"',
    text: 'Мій син один із випускників, йому дуже сподобалося. Супер крутий курс "Фізика навколо нас"! Будемо навчатися разом ще.',
    image: "https://optim.tildacdn.one/tild3636-6266-4037-b866-613032656632/-/cover/200x200/center/center/-/format/webp/e4.png.webp",
  },
  {
    name: 'Андрій Герасименко',
    role: 'Студент курсу "Фізика навколо нас" (16 років)',
    text: 'Мені сподобались інтерактиви, підтримка ментора та те, що було багато експериментів. Ці знання мені допомогли з розумінням шкільного матеріалу з фізики. Було круто!',
    image: "https://optim.tildacdn.one/tild6132-6237-4162-b530-633066613661/-/cover/200x200/center/center/-/format/webp/e1.png.webp",
  },
];

const Reviews = () => {
  return (
    <section className="reviews" id="reviewMain">
      <h2 className="reviews__title">Ми дійсно закохуємо у навчання ❤</h2>
      <div className="reviews__subtitle">Це підтверджують наші учні</div>

      {/* ✅ Десктопна версія */}
      <div className="reviews__grid desktop-only">
        {reviews.map((review, index) => (
          <div className="review" key={index}>
            <img src={review.image} alt={review.name} className="review__image" />
            <div>
              <p className="review__text">{review.text}</p>
              <h4 className="review__name">{review.name}</h4>
              <p className="review__role">{review.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Мобільна версія - Swiper */}
      <div className="reviews__slider mobile-only">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="reviews_swiper_slide">
              <div className="review">
                <img src={review.image} alt={review.name} className="review__image" />
                <div>
                  <p className="review__text">{review.text}</p>
                  <h4 className="review__name">{review.name}</h4>
                  <p className="review__role">{review.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;