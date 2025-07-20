import React, { useState, useEffect } from 'react'
import Footer from '../footer/Footer';
import Statistics from '../statistics/Statistics';
import HeaderSignIn from '../headerSignIn/HeaderSignIn';

import { Link } from 'react-router-dom';

export default function MainSignIn() {
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

  return (
    <div className='main'>
        {signIn ? (
            <>
                <HeaderSignIn />
                <Statistics />
                <Footer />
            </>
        ) : (
            <>
                <Link to="/login" className="header_nav_button" style={{marginTop: "400px"}}>Зареєструватись</Link>
            </>
        )}
    </div>
  )
}
