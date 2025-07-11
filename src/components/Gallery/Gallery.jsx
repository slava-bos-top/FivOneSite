import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Gallery.css';

import logo from "./../../img/logo.jpg"
import course1 from "./../../img/course1.png"
import course2 from "./../../img/course2.png"
import course3 from "./../../img/course3.png"
import course4 from "./../../img/course4.png"
import course5 from "./../../img/course5.png"
import course6 from "./../../img/course6.png"
import course7 from "./../../img/course7.png"
import course8 from "./../../img/course8.png"

import soundGif from './images/sound.gif';
import audio from "./media/ambient.mp3";

import { coursesData } from './coursesData';

const coursesDataBlock = [
  {
    title: 'Курс “Прокачка логічного мислення”',
    description: 'За 10 занять ви навчитесь розв`язувати винахідницькі та логічні  задачі, ви дізнаєтесь, як застосовувати різні методи для їхнього вирішення.',
    details: [
      'тривалість занять - 2 години;',
      'поєднання лінгвістики, математики, фізики та психології.'
    ],
    image: course1,
    logo: logo,
    color: '#16BAAE',
    number: 0
  },
  {
    title: 'Курс “Старт програмування”',
    description: 'Починаючи з першого заняття учні пишуть власні програми та вивчають мову програмування С++.',
    details: [
      'Від вивчення синтаксису до створення ІТ-проєктів. Після курсу ви зможете брати участь в олімпіадах з програмування.'
    ],
    image: course2,
    logo: logo,
    color: '#94BF47',
    number: 1
  },
  {
    title: 'Курс “Розвиток креативності”',
    description: 'Від розвитку креативності у побуті до створення власних креативних проєктів.',
    details: [
      'Навчаємо розвивати креативність, реалізувати власні ідеї та мріяти.',
      '20+ вправ на розвиток креативності.'
    ],
    image: course3,
    logo: logo,
    color: '#FFCE07',
    number: 2
  },
  {
    title: 'Курс “Основи WEB-розробки”',
    description: 'Під час проходження курсу учні обирають приклад сайту, який хочуть створити. Навчаючись програмувати різні елементи сайту, учні адаптують їх відповідно до створеного власноруч макету.',
    details: [
      'В кінці курсу кожен учень запрограмує свій унікальний веб-сайт.'
    ],
    image: course4,
    logo: logo,
    color: '#E95C28',
    number: 3
  },
  {
    title: 'Курс “3D-анімації”',
    description: 'Впродовж курсу учні створюють п`ять онімованих 3D-об`єктів, які одразу можна додавати у своє портфоліо.',
    details: [
      'На курсі також вивчаються основи геометрії для анімування 3D-фігур.'
    ],
    image: course5,
    logo: logo,
    color: '#16BAAE',
  },
  {
    title: 'Курс “Фізика навколо нас”',
    description: 'За 10 занять в інтерактивній формі розповідаємо найцікавіше з курсу шкільної фізики.',
    details: [
      'більше 15 експериментів',
      'більше 50 інтерактивів'
    ],
    image: course6,
    logo: logo,
    color: '#FFCE07',
    number: 4
  },
  {
    title: 'Курс “Старт програмування Python”',
    description: 'Починаючи з першого заняття учні пишуть власні програми та вивчають мову програмування Python.',
    details: [
      'Від вивчення синтаксису до створення ІТ-проєктів. Після курсу учні зможуть брати участь в олімпіадах з програмування.'
    ],
    image: course7,
    logo: logo,
    color: '#94BF47',
  },
  {
    title: 'Курс “Розробка ігор”',
    description: 'За 10 занять учні створять різні елементи ігор. Вони навчаться основам розробки UNITY на та програмування мовою C#.',
    details: [
      'В кінці курсу кожен з учнів створить власну гру.'
    ],
    image: course8,
    logo: logo,
    color: '#E95C28',
  },
];

export default function Gallery() {
  const { hash } = useLocation();

  const getColor = (i) => {
    const colors = ['var(--cyan)', 'var(--green)', 'var(--yellow)', 'var(--red)'];
    return colors[i % colors.length];
  };

    // 🔁 Прокрутка при зміні хеша
  useEffect(() => {
    if (hash && window.scrollToFrame) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        window.scrollToFrame(id);
      }, 300); // Дати час для рендеру DOM
    }
  }, [hash]);

  return (
    <div className="scroll-container">
      <div className="container">

        <section className="courses-gallery">
          <div className="courses__header-gallery">
            <h2>Наші курси</h2>
          </div>

          <div className="courses__grid-gallery">
            {coursesDataBlock.map((course, i) => (
              <div key={i} className="course-card-gallery" style={{ '--accent': getColor(i) }}>
                <img src={course.image} alt="course_img" className="course-card__image-gallery" />
                <div className="course-card__content-gallery">
                  <img src={logo} alt="logo" className="course-card__logo-gallery" />
                  <h3 style={{color: course.color}}>{course.title}</h3>
                  <div className="course-card__description-gallery">
                    <p className="course-card__description_one-gallery">{course.description}</p>
                    <p className="course-card__description_two-gallery">{course.details}</p>
                  </div>
                  <Link to="/course" state={coursesData[course.number]} className="course-card__button-gallery" style={{background: course.color}}>
                    Дізнатися більше
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}