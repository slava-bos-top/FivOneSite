import React, { useState, useEffect } from 'react'
import Header from '../header/Header';
import Promo from '../promo/Promo';
import Gallery from '../Gallery/Gallery';
import AboutUs from '../aboutUs/AboutUs';
import Learning from '../learning/Learning';
import Reviews from '../reviews/Reviews';
import Footer from '../footer/Footer';
import Statistics from '../statistics/Statistics';

export default function Main() {
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

  return (
    <div className='main'>
      {signIn ? (
        <div>
          <Header />
          <Statistics />
          <Footer />
        </div>
      ) : (
        <div>
          <Header />
          <Promo />
          <Gallery />
          <Statistics />
          <AboutUs/>
          <Learning />
          <Reviews/>
          <Footer />
        </div>
      )}
    </div>
  )
}
