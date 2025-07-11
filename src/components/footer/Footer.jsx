import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-contact-section">
        <h2>Контакти</h2>
        <div className="footer-section-text">
            <p>
                Ми любимо спілкуватися. Тому, якщо у вас виникли будь-які запитання,
                пишіть або дзвоніть нам
            </p>
        </div>
        <p className="footer-link-one">+38 097 824 33 89</p>
        <p className="footer-link-two">
          fivone.education@gmail.com
        </p>
        <div className="footer-icons">
          <a href="#https://www.facebook.com/fivone.education"><i className="fab fa-facebook"></i></a>
          <a href="#https://www.instagram.com/fivone.education/#"><i className="fab fa-instagram"></i></a>
          <a href="#https://www.youtube.com/c/FivOneEducation"><i className="fab fa-youtube"></i></a>
          <a href="#https://t.me/fivone"><i className="fab fa-telegram"></i></a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-block">
            <div className="footer-left">
                <img src="https://optim.tildacdn.one/tild3533-3039-4032-a239-376535663937/-/resize/144x/-/format/webp/logo.png.webp" alt="FivOne Logo" className="courses_footer-logo" />
                <p>© 2020 FivOne</p>
            </div>

            <div className="footer-middle">
                <p>Контакти</p>
                <p>+38 097 824 33 89</p>
                <p>fivone.education@gmail.com</p>
                <div className="footer-icons-gray">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-youtube"></i>
                    <i className="fab fa-telegram"></i>
                </div>
            </div>
        </div>

        <div className="footer-bottom-block">
            <div className="footer-links">
            <span>Політика приватності</span>
            <span>Публічна оферта</span>
            <div className="payment-icons">
                <img src="https://static.tildacdn.one/tild3063-3130-4939-b432-643737393138/mcsc.svg" alt="MasterCard" />
                <img src="https://static.tildacdn.one/tild6666-3333-4533-a665-643964663264/vbv.svg" alt="Visa" />
            </div>
            </div>

            <div className="footer-company">
            <p>ФОП Семенко К. М.</p>
            <p>РНОКПП 3638404340</p>
            <p>08131, Київська область,</p>
            <p>Софіївська Борщагівка,</p>
            <p>вул. Лесі Українки 6/65</p>
            </div>
        </div>
      </div>

      <div className="footer-made">
        <div>© WebDesign <span className="tilda-logo">Master</span></div>
      </div>
    </footer>
  );
};

export default Footer;