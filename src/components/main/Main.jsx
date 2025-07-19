import React from 'react'

import Header from '../header/Header';
import Promo from '../promo/Promo';
import Gallery from '../Gallery/Gallery';
import AboutUs from '../aboutUs/AboutUs';
import Learning from '../learning/Learning';
import Reviews from '../reviews/Reviews';
import Footer from '../footer/Footer';
import Statistics from '../statistics/Statistics';

export default function Main() {
  return (
    <div className='main'>
        <Header />
        <Promo />
        <Gallery />
        <Statistics />
        <AboutUs/>
        <Learning />
        <Reviews/>
        <Footer />
    </div>
  )
}
