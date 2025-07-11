import React from 'react';
import './Promo.css';

import Wave from "../../img/YellowWave.jpg"
import { Link } from 'react-router-dom';

// import fbIcon from './images/facebook.png';
// import instaIcon from './images/instagram.png';
// import ytIcon from './images/youtube.png';
// import tgIcon from './images/telegram.png';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__left">
      </div>

      <div className="promo__center">
        <img className="promo__logo" data-original="https://static.tildacdn.one/tild3339-3265-4564-b633-613333616634/logo_phrase1.png" src="https://optim.tildacdn.one/tild3339-3265-4564-b633-613333616634/-/format/webp/logo_phrase1.png.webp" alt="Logo" imgfield="tn_img_1589914726250"/>
        <h1>Закохуємо у навчання підлітків, батьків і вчителів</h1>
        {/* <button className="promo__button">Зареєструватись</button> */}
        <Link to="/registration" className="promo__button">Зареєструватись</Link>
      </div>

      <div className="promo__right">
        <img className="promo__phone" data-original="https://static.tildacdn.one/tild3566-3936-4033-b732-366333326435/wow_girl.png" src="https://optim.tildacdn.one/tild3566-3936-4033-b732-366333326435/-/format/webp/wow_girl.png.webp" alt="Promo" imgfield="tn_img_1589915672791"/>
      </div>
      <img class="promo__wave" src={Wave} alt="" imgfield="tn_img_1589915610695"/>

      {/* ⬇️ Цей блок дозволяє скрол одразу після Promo */}
      <div id="gallery-start"></div>
    </section>
  );
}
