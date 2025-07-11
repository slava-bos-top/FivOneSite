import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

import "./Courses.css"

import { coursesProgram } from './coursesProgram';

export default function Courses() {

    const location = useLocation();
    const { 
      title, 
      description, 
      AddDescription,
      backgroundColorOpacity, 
      backgroundColor, 
      AddBackgroundColor, 
      color,
      whyMain,
      whyBlock1,
      whyBlock2,
      whyBlock3,
      founderIs,
      founderTitle,
      founderText,
      program,
      result,
      chatIs,
      chatText1,
      chatText2
     } = location.state || {};

     const [openIndexes, setOpenIndexes] = useState([]);

     const toggle = (index) => {
       if (openIndexes.includes(index)) {
         // Якщо вже відкритий — закриваємо
         setOpenIndexes(openIndexes.filter(i => i !== index));
       } else {
         // Інакше додаємо до списку відкритих
         setOpenIndexes([...openIndexes, index]);
       }
     };

     useEffect(() => {
      window.scrollTo(0, 0); // Прокрутка до початку
    }, []);
  
    return (
      <div className='courses' style={{color: `${color}`}}>
        <section className='courses_promo' style={{backgroundImage: `-webkit-gradient(linear, left top, left bottom, from(${backgroundColorOpacity}), to(${backgroundColor}))`}}>
          <img src="https://optim.tildacdn.one/tild3533-3039-4032-a239-376535663937/-/resize/240x/-/format/webp/logo.png.webp" alt="logo" style={{width: "150px"}} className="courses_promo_logo"/>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{AddDescription}</p>
          <img src="https://optim.tildacdn.one/tild6532-3430-4839-b332-383065663765/-/resize/560x/-/format/webp/shape6.png.webp" alt="logo" style={{width: "450px"}} className="courses_promo_image1"/>
          <img src="https://optim.tildacdn.one/tild6261-3865-4932-b634-626234323332/-/resize/450x/-/format/webp/shape3.png.webp" alt="logo" style={{width: "350px"}} className="courses_promo_image2"/>
          <img src="https://optim.tildacdn.one/tild3436-3139-4163-b934-386433346333/-/resize/600x/-/format/webp/shape1.png.webp" alt="logo" style={{width: "450px"}} className="courses_promo_image3"/>
        </section>
        <section className='courses_main'>
          <div>
            <p className='courses_main_text'>{whyMain}</p>
          </div>
          <div className='courses_main_block'>
            <div className="courses_main_block1">
              <img src="https://static.tildacdn.one/tild6235-3030-4261-b661-323334343538/check.svg" alt="icon" />
              <p>{whyBlock1}</p>
            </div>
            <div className="courses_main_block1">
              <img src="https://static.tildacdn.one/tild6235-3030-4261-b661-323334343538/check.svg" alt="icon" />
              <p>{whyBlock2}</p>
            </div>
            <div className="courses_main_block1">
              <img src="https://static.tildacdn.one/tild6235-3030-4261-b661-323334343538/check.svg" alt="icon" />
              <p>{whyBlock3}</p>
            </div>
          </div>
        </section>

        <>
          {founderIs === "1" ? (
            <section className='courses_features'>
              <h2>{founderTitle}</h2>
              <div className='courses_features_block'>
                <img src="https://optim.tildacdn.one/tild6433-6334-4336-b932-363837636433/-/cover/120x120/center/center/-/format/webp/noroot.png.webp" alt="icon"/>
                <div>
                  <p className="courses_features_text">{founderText}</p>
                  <h4 className="courses_features_name">Каріна Семенко</h4>
                  <p className="courses_features_role">Засновниця та директорка FivOne</p>
                </div>
              </div>
            </section>
          ) : (<></>)}
        </>

        <section className='courses_learning'>
          <div className="courses_learning__container">
            <h2 className="courses_learning__title">Особливості навчання</h2>

            <div className="courses_learning__content">
              <div className="courses_learning__left">
                <div className="courses_learning__item">
                  <p className='courses_learning__item_text'><strong>Якість</strong><br /> Заняття проходять у реальному часі у додатку Discord — найкращій платформі для відео-, текстової та голосової комунікації</p>
                  <div
                    className="courses_learning__icon"
                    style={{ backgroundImage: "url(https://static.tildacdn.one/tild3361-3664-4266-b636-383737653330/7.svg)" }}
                  ></div>
                </div>
                <div className="courses_learning__item">
                  <p className='courses_learning__item_text'><strong>Враження</strong><br /> Усі заняття містять інтерактивні завдання (чат-боти, квізи, опитування, командні проєкти), які допомагають засвоїти матеріал уроку</p>
                  <div className="courses_learning__icon" style={{ backgroundImage: "url(https://static.tildacdn.one/tild3238-3337-4963-b865-643035636263/9.svg)" }}></div>
                </div>
                <div className="courses_learning__item">
                  <p className='courses_learning__item_text'><strong>Домашні завдання</strong><br /> Після кожного заняття учні отримують цікаві домашні завдання, які хочеться виконувати</p>
                  <div className="courses_learning__icon" style={{ backgroundImage: "url(https://static.tildacdn.one/tild3135-3062-4334-b965-366566653035/4.svg)" }}></div>
                </div>
              </div>

              <div className="courses_learning__image">
                <img src="https://optim.tildacdn.one/tild6638-6339-4262-b166-386231636236/-/resize/600x/-/format/webp/whitephone_empty.png.webp" alt="Про нас" />
              </div>

              <div className="courses_learning__right">
                <div className="courses_learning__item">
                  <div className="courses_learning__icon" style={{ backgroundImage: "url(https://static.tildacdn.one/tild3237-3632-4731-b535-626638623130/1.svg)" }}></div>
                  <p><strong>Підтримка</strong><br /> На занятті учні отримують зворотній зв'язок від лектора, а після — комунікують у Telegram-чаті групи. Вони можуть ставити додаткові запитання та спілкуватись з друзями</p>
                </div>
                <div className="courses_learning__item">
                  <div className="courses_learning__icon" style={{ backgroundImage: "url(https://static.tildacdn.one/tild6562-6239-4164-b931-336330346162/11.svg)" }}></div>
                  <p><strong>Гнучкий графік</strong><br /> Заняття проходять ввечері щоп'ятниці з можливістю передивитись запис заняття після завершення уроку</p>
                </div>
                <div className="courses_learning__item">
                  <div className="courses_learning__icon" style={{ backgroundImage: "url(https://static.tildacdn.one/tild6635-3036-4739-b865-373939393163/5.svg)" }}></div>
                  <p><strong>Дистанційність</strong><br /> Приєднуватись до заняття можна як з комп'ютера, так і з телефона, у будь-якому місці з гарним інтернет-зв'язком</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="course-program">
          <h2 className="course-program-title">Програма курсу</h2>
          <div className="course-program-lessons">
            {coursesProgram[program].map((lesson, index) => (
              <div className="course-program-lesson" key={index}>
                <div
                  className="course-program-lesson-header"
                  onClick={() => toggle(index)}
                >
                  <div className="course-program-lesson-info">
                    <span className="course-program-lesson-title">{lesson.title}</span>
                    <span
                      className="course-program-lesson-subtitle"
                      style={{ color: backgroundColor }}
                    >
                      {lesson.subtitle}
                    </span>
                  </div>
                  <span className="course-program-toggle-symbol" style={{'--toggle-bg': backgroundColor}}>
                    {openIndexes.includes(index) ? '×' : '+'}
                  </span>
                </div>

                <div
                  className={`course-program-lesson-content-wrapper ${
                    openIndexes.includes(index) ? 'open' : ''
                  }`}
                >
                  <div className="course-program-lesson-content">
                    {lesson.content.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='courses_result' style={{backgroundImage: "url(https://optim.tildacdn.one/tild3666-3830-4561-b663-626165376235/-/format/webp/noroot.png.webp)"}}>
          <h2>Який результат ви отримаєте?</h2>
          <p>{result}</p>
        </section>

        {chatIs === "1" ? (
          <section className='courses_info' style={{backgroundColor: `${backgroundColor}`}}>
            <div className="dialog-wrapper">
              <div className="bubble bubble-yellow">
                <div className="bubble-label">Student</div>
                <div className="bubble-text">
                  {chatText1}
                </div>
              </div>

              <div className="bubble bubble-white">
                <div className="bubble-label">FivOne</div>
                <div className="bubble-text">
                  {chatText2}
                </div>
              </div>
            </div>
          </section>
        ) : (<></>)}

        <footer className='courses_footer'>
          <div>
            <Link to="/registration" className="about__button glowing-button">Зареєструватись</Link>
          </div>
          <div className="courses_footer-bottom">
            <div className="courses_footer-bottom-block">
                <div className="courses_footer-left">
                    <img src="https://optim.tildacdn.one/tild3533-3039-4032-a239-376535663937/-/resize/144x/-/format/webp/logo.png.webp" alt="FivOne Logo" className="courses_footer-logo" />
                    <p>© 2020 FivOne</p>
                </div>

                <div className="courses_footer-middle">
                    <p>Контакти</p>
                    <p>+38 097 824 33 89</p>
                    <p>fivone.education@gmail.com</p>
                    <div className="courses_footer-icons-gray">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-youtube"></i>
                        <i className="fab fa-telegram"></i>
                    </div>
                </div>
            </div>

            <div className="courses_footer-bottom-block">
                <div className="courses_footer-links">
                <a href="#">Політика приватності</a>
                <a href="#">Публічна оферта</a>
                <div className="payment-icons">
                    <img src="https://static.tildacdn.one/tild3063-3130-4939-b432-643737393138/mcsc.svg" alt="MasterCard" />
                    <img src="https://static.tildacdn.one/tild6666-3333-4533-a665-643964663264/vbv.svg" alt="Visa" />
                </div>
                </div>

                <div className="courses_footer-company">
                <p>ФОП Семенко К. М.</p>
                <p>РНОКПП 3638404340</p>
                <p>08131, Київська область,</p>
                <p>Софіївська Борщагівка,</p>
                <p>вул. Лесі Українки 6/65</p>
                </div>
            </div>
          </div>

          <div className="courses_footer-made">
            <div>© WebDesign <span className="tilda-logo">Master</span></div>
          </div>
        </footer>
      </div>
    );
}
