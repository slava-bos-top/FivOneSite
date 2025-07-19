import React, {useRef, useEffect, useState} from 'react'
import { useLocation, Link } from 'react-router-dom';
import Swiper from '../swiper/Swiper';

import "./Competition.css"

export default function Competition() {
    const location = useLocation();
    const [signIn, setSignIn] = useState(false)

    useEffect(() => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const { isLoggedIn } = JSON.parse(savedUser);
        if (isLoggedIn) {
          setSignIn(true)
          // Наприклад, показати імʼя в Header
        }
      }
    }, []);
    const handleLogout = () => {
      localStorage.removeItem("user");
      setSignIn(false)
    };

    // 🔹 Зберігаємо в localStorage якщо передано через location.state
    useEffect(() => {
      if (location.state) {
        localStorage.setItem("competitionData", JSON.stringify(location.state));
      }
    }, [location.state]);

    useEffect(() => {
        window.scrollTo(0, 0); // Прокрутка до початку
      }, []);
  
    // 🔹 Отримуємо дані
    const localData = localStorage.getItem("competitionData");
    const data = location.state || (localData ? JSON.parse(localData) : {});
  
    const { 
      title, 
      titleElement,
      imgTitle,
      width,
      description, 
      paragraph,
      AddParagraph,
      backgroundColor, 
      Block1, 
      Block2,
      Block3,
      chemistry,
      AboutBlock1,
      AboutBlock2,
      AboutImage1,
      AboutImage2,
      AboutImage3,
      AboutElement1,
      AboutElement2,
      AboutElement3,
      Content1,
      Content2,
      Content3,
      titleCreator,
      mainCreator,
      imgCreator,
      reviewIs,
    } = data;
  
    // 🔹 Скрол анімація
    const sections = [0, 1, 2]; // стільки блоків скільки треба
    const divRefs = useRef([]);
    const [visibleStates, setVisibleStates] = useState(
      new Array(sections.length).fill(false)
    )
  
    useEffect(() => {
        const handleScroll = () => {
          const updatedStates = [...visibleStates];
    
          divRefs.current.forEach((ref, index) => {
            if (!ref) return;
            const top = ref.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
    
            if (top < windowHeight - 100) {
              updatedStates[index] = true;
            }
          });
    
          setVisibleStates(updatedStates);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [visibleStates]);

  return (
    <div className='competition_container'>
        <header className="competition_container_header">
            <div className="competition_container_header_block1">
                <img 
                    src="https://optim.tildacdn.one/tild3339-3265-4564-b633-613333616634/-/format/webp/logo_phrase1.png.webp"
                    alt="logo"
                    style={{ width: "200px" }}
                />
            </div>
            <div className="competition_container_header_block2" style={{backgroundColor: backgroundColor}}>
                <ul className="competition_container_header_list">
                    <li><Link to="/" className="competition_container_header_button">Про освітній центр</Link></li>
                    <li><a href="#about_competition" className="competition_container_header_button">Про марафон</a></li>
                    <li><Link to="/login" className="competition_container_header_button">Зареєструватись</Link></li>
                    <li><button className="competition_container_header_phone">+380 97 824-33-89</button></li>
                </ul>
            </div>
        </header>
        <section className="competition_container_promo">
            <div className='competition_container_promo_main'>
                <h2><span style={{color: backgroundColor}}>{title}</span> {titleElement}</h2>
                <span className='competition_container_promo_main_start'>{description}</span>
                <p className='competition_container_promo_main_text'>{paragraph}</p>
                <div className='competition_container_promo_main_block'>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Link to="/login" className="competition_container_header_button" style={{backgroundColor: backgroundColor, alignItems: "center", textAlign: "center", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "20px", paddingRight: "20px", borderRadius: "20px", marginBottom: "15px"}}>Зареєструватись</Link>
                        <span style={{width: "120px"}}>3 тижні</span>
                    </div>
                    <p>{AddParagraph}</p>
                </div>
            </div>
            <div className='competition_container_promo_image'>
                {/* Жовтий фон, що рухається */}
                <div className="moving_circle" style={{backgroundColor: backgroundColor}}></div>

                {/* Телефон на передньому плані */}
                <img
                    className="phone_image"
                    src={imgTitle}
                    alt="img_marathon_bg"
                    style={{width: width}}
                />
            </div>
        </section>
        <section className="competition_container_about">
            <div className="competition_container_about_first" style={{border: `2px solid ${backgroundColor}`}}>
                <div>
                    <h4 style={{color: backgroundColor}}>Платформа для навчання —</h4>
                    <div>
                        <a href="#https://t.me/fivone"><i className="fab fa-telegram" style={{color: "#0088cc"}}></i></a>
                        <p>Telegram (Месенджер)</p>
                    </div>
                </div>
                <div>
                    <h4 style={{color: backgroundColor}}>Формат —</h4>
                    <p>щоденні онлайн-практики та завдання</p>
                </div>
            </div>
            <div className="scroll-section">
                <div
                    ref={(el) => (divRefs.current[0] = el)}
                    className={`slide-right-element ${
                        visibleStates[0] ? "active" : ""
                    }`}
                >
                    <div className='slide-right-block' style={{backgroundColor: backgroundColor}}></div>
                </div>
                <h3 id='about_competition'>Для кого курс?</h3>
            </div>
            <div className="competition_container_about_second">
                <div>
                    <img src='https://optim.tildacdn.one/tild3166-6637-4333-a439-326335626566/-/resize/240x/-/format/webp/astr1.png.webp' alt="img_space"/>
                    <p>{Block1}</p>
                </div>
                <div>
                    <img src='https://optim.tildacdn.one/tild3562-3431-4839-b937-636365393035/-/resize/240x/-/format/webp/astr2.png.webp' alt='img_space'/>
                    <p>{Block2}</p>
                </div>
                <div>
                    <img src='https://optim.tildacdn.one/tild3434-3863-4631-b063-636338323862/-/resize/240x/-/format/webp/astr3.png.webp' alt='img_space'/>
                    <p>{Block3}</p>
                </div>
            </div>
            <div className="competition_container_about_third" style={{border: `2px solid ${backgroundColor}`}}>
                <div className="competition_container_about_third_component1">
                    <p>{AboutBlock1}</p>
                    <span>{AboutBlock2}</span>
                </div>
                <div className="competition_container_about_third_component2">
                    <div className="competition_container_about_third_element">
                        <div style={{backgroundColor: backgroundColor}}>
                            <img src={AboutImage1} alt='img_c++' className='competition_block_about'/>
                        </div>
                        <p>{AboutElement1}</p>
                    </div>
                    <div className="competition_container_about_third_element">
                        <div style={{backgroundColor: backgroundColor}}>
                            <img src={AboutImage2} alt='python'/>
                        </div>
                        <p>{AboutElement2}</p>
                    </div>
                    <>
                        <div className="competition_container_about_third_element">
                            <div style={{backgroundColor: backgroundColor}}>
                                <img src={AboutImage3} alt='JavaScript' className='competition_block_about'/>
                            </div>
                            <p>{AboutElement3}</p>
                        </div>
                    </>
                </div>
            </div>
        </section>
        <section className="competition_program">
            <div className="scroll-section">
                <div
                    ref={(el) => (divRefs.current[1] = el)}
                    className={`slide-right-element ${
                      visibleStates[1] ? "active" : ""
                    }`}
                >
                    <div className='slide-right-block' style={{backgroundColor: backgroundColor}}></div>
                </div>
                <h3>Програма</h3>
            </div>
            <div className="competition_container_program">
                <div className='competition_program_block'>
                    <div className='competition_program_text'>
                        <div className='competition_program_text_main'>
                            <div className='competition_program_yellow' style={{backgroundColor: backgroundColor}}></div>
                            <h4>1-й тиждень</h4>
                        </div>
                        <p>
                            {Content1}
                        </p>
                    </div>
                </div>
                <div className='competition_program_block'>
                    <div className='competition_program_text'>
                        <div className='competition_program_text_main'>
                            <div className='competition_program_yellow' style={{backgroundColor: backgroundColor}}></div>
                            <h4>2-й тиждень</h4>
                        </div>
                        <p>
                            {Content2}
                        </p>
                    </div>
                </div>
                <div className='competition_program_block'>
                    <div className='competition_program_text'>
                        <div className='competition_program_text_main'>
                            <div className='competition_program_yellow' style={{backgroundColor: backgroundColor}}></div>
                            <h4>3-й тиждень</h4>
                        </div>
                        <p>
                            {Content3}
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section className='competition_creator'>
            <div className="scroll-section">
                <div
                    ref={(el) => (divRefs.current[2] = el)}
                    className={`slide-right-element ${
                      visibleStates[2] ? "active" : ""
                    }`}
                >
                    <div className='slide-right-block' style={{backgroundColor: backgroundColor}}></div>
                </div>
                <h3>Автори</h3>
            </div>
            <div className='competition_creator_container'>
                <div className='competition_creator_container_block'>
                    <img src='https://optim.tildacdn.one/tild3065-6634-4563-b830-386461323731/-/resize/178x/-/format/webp/karina.png.webp' alt='img_creator'/>
                    <div>
                        <h4>Каріна Семенко</h4>
                        <p>На сьогодні у мене 103 успішно завершених онлайн-курсів на різних онлайн-платформах. Я маю досвід створення багатьох онлайн-курсів, розробки програм навчання та організації офлайн-заходів. FivOne — це не просто освітній центр, а місце, де я реалізовую всі свої ідеї, щоб зробити освіту якісною та захопливою</p>
                    </div>
                </div>
                <div className='competition_creator_container_block'>
                    <img src={imgCreator} alt='img_creator'/>
                    <div>
                        <h4>{titleCreator}</h4>
                        <p>{mainCreator}</p>
                    </div>
                </div>
            </div>
        </section>
        {reviewIs === "1" ? (<section className='competition_swiper'>
            <h3>Чому «Програмування для всіх»?</h3>
            <div>
                <span>Тому що якщо ти старше 10 років, тобі 100% підійде такий формат марафону. Читай історії наших студентів</span>
            </div>
            <Swiper />
        </section>) : (<></>)}
        <footer className='courses_footer'>
          {chemistry === "1" ? (
            <div>
               {signIn ? (
                <button className="about__button glowing-button-chemistry" onClick={handleLogout}>Вийти</button>
               ) : (
                <Link to="/login" className="about__button glowing-button-chemistry">Зареєструватись</Link>
               )}
            </div>
          ) : (
            <div>
                {signIn ? (
                    <button className="about__button glowing-button" onClick={handleLogout}>Вийти</button>
                ) : (
                    <Link to="/login" className="about__button glowing-button">Зареєструватись</Link>
                )}
            </div>
          )}
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
  )
}
