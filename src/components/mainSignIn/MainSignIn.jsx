import React, { useState, useEffect } from 'react'
import Footer from '../footer/Footer';
import Statistics from '../statistics/Statistics';
import HeaderSignIn from '../headerSignIn/HeaderSignIn';

export default function Main() {

  return (
    <div className='main'>
        <HeaderSignIn />
        <Statistics />
        <Footer />
    </div>
  )
}
