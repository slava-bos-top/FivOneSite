import React, { useState, useEffect } from 'react'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Statistics from '../statistics/Statistics';

export default function Main() {

  return (
    <div className='main'>
        <Header />
        <Statistics />
        <Footer />
    </div>
  )
}
