import React, { useState, useEffect } from 'react';
import 'react-circular-progressbar/dist/styles.css';

import './Statistics.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


function CircularProgress({ percentage, colors }) {
    const fromColor = "#FFCE07"
    const toColor = "#E95C28"

  const strokeDasharray = 283;
  const strokeDashoffset = strokeDasharray * (1 - percentage / 100);

  return (
    <svg width="150" height="150" viewBox="-5 -5 110 110">
      <defs>
        <linearGradient id={`grad-${fromColor}-${toColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFCE07" />
          <stop offset="100%" stopColor="#E95C28" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="none" stroke="#00008b" strokeWidth="12" />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={`url(#grad-${fromColor}-${toColor})`}
        strokeWidth="12"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="55" textAnchor="middle" fontSize="20" fill="#00008b" fontWeight="bold">
        {Math.round(percentage)}%
      </text>
    </svg>
  );
}

const gradients = [
  ["#FFCE07", "#E95C28"],
  ["#94BF47", "#16BAAE"],
  ["#16BAAE", "#FFCE07"],
  ["#E95C28", "#94BF47"],
  ["#94BF47", "#FFCE07"]
];

function SplitScreen() {
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const [phone, setPhone] = useState("")

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [image, setImage] = useState("")
  const [maraphone1, setMaraphone1] = useState(0)
  const [maraphone2, setMaraphone2] = useState(0)
  const [maraphone3, setMaraphone3] = useState(0)
  const [maraphone4, setMaraphone4] = useState(0)
  const [maraphone5, setMaraphone5] = useState(0)
  const [week1, setWeek1] = useState(0)
  const [week2, setWeek2] = useState(0)
  const [week3, setWeek3] = useState(0)
  const [week4, setWeek4] = useState(0)
  const [week5, setWeek5] = useState(0)
  const [week6, setWeek6] = useState(0)
  const [week7, setWeek7] = useState(0)
  const [week8, setWeek8] = useState(0)
  const [week9, setWeek9] = useState(0)
  const [week10, setWeek10] = useState(0)
  const [week11, setWeek11] = useState(0)
  const [week12, setWeek12] = useState(0)
  const [week13, setWeek13] = useState(0)

  const gradientColors = ["#FFCE07", "#E95C28"];

  useEffect(() => {
    const fetchUserData = async () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const { isLoggedIn, phone } = JSON.parse(savedUser);
        if (isLoggedIn) {
          setPhone(phone);
  
          try {
            const checkRes = await fetch(
              `https://script.google.com/macros/s/AKfycbyNKzfJN-ghkSbcBCXhMzow-GZeQ81JTrdzZgZ9AUqQRaierqDTddPxuupT2bdj7M_q/exec?phone=${phone}`
            );
            const checkData = await checkRes.json();
  
            console.log(checkData);
  
            setName(checkData.name);
            setSurname(checkData.surname);
            setImage(checkData.photo);
            setMaraphone1(Number(checkData.maraphone1));
            setMaraphone2(Number(checkData.maraphone2));
            setMaraphone3(Number(checkData.maraphone3));
            setMaraphone4(Number(checkData.maraphone4));
            setMaraphone5(Number(checkData.maraphone5));
            setWeek1(Number(checkData.week1));
            setWeek2(Number(checkData.week2));
            setWeek3(Number(checkData.week3));
            setWeek4(Number(checkData.week4));
            setWeek5(Number(checkData.week5));
            setWeek6(Number(checkData.week6));
            setWeek7(Number(checkData.week7));
            setWeek8(Number(checkData.week8));
            setWeek9(Number(checkData.week9));
            setWeek10(Number(checkData.week10));
            setWeek11(Number(checkData.week11));
            setWeek12(Number(checkData.week12));
            setWeek13(Number(checkData.week13));
          } catch (error) {
            console.error("❌ Помилка при завантаженні даних користувача:", error);
          }
        }
      }
    };
  
    fetchUserData();
  }, []);

  const handleUserData = async () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const { isLoggedIn, phone } = JSON.parse(savedUser);
      if (isLoggedIn) {
        setPhone(phone);

        try {
          const checkRes = await fetch(
            `https://script.google.com/macros/s/AKfycbyNKzfJN-ghkSbcBCXhMzow-GZeQ81JTrdzZgZ9AUqQRaierqDTddPxuupT2bdj7M_q/exec?phone=${phone}`
          );
          const checkData = await checkRes.json();

          console.log(checkData);

          setName(checkData.name);
          setSurname(checkData.surname);
          setImage(checkData.photo);
          setMaraphone1(Number(checkData.maraphone1));
          setMaraphone2(Number(checkData.maraphone2));
          setMaraphone3(Number(checkData.maraphone3));
          setMaraphone4(Number(checkData.maraphone4));
          setMaraphone5(Number(checkData.maraphone5));
          setWeek1(Number(checkData.week1));
          setWeek2(Number(checkData.week2));
          setWeek3(Number(checkData.week3));
          setWeek4(Number(checkData.week4));
          setWeek5(Number(checkData.week5));
          setWeek6(Number(checkData.week6));
          setWeek7(Number(checkData.week7));
          setWeek8(Number(checkData.week8));
          setWeek9(Number(checkData.week9));
          setWeek10(Number(checkData.week10));
          setWeek11(Number(checkData.week11));
          setWeek12(Number(checkData.week12));
          setWeek13(Number(checkData.week13));
        } catch (error) {
          console.error("❌ Помилка при завантаженні даних користувача:", error);
        }
      }
    }
  };

  const marathonsData = [
    {
      title: "Марафон з фізики",
      marathone: maraphone1,
      totalMarathone: 3,
      totalWeek1: 7,
      totalWeek2: 6,
      totalWeek3: 6,
      week1: week1,
      week2: week2,
      week3: week3,
      exist: true
    },
    {
      title: "Марафон з хімії",
      marathone: maraphone2,
      totalMarathone: 3,
      totalWeek1: 6,
      totalWeek2: 6,
      totalWeek3: 6,
      week1: week4,
      week2: week5,
      week3: week6,
      exist: true
    },
    {
        title: "Марафон з креативності",
        marathone: maraphone3,
        totalMarathone: 3,
        totalWeek1: 7,
        totalWeek2: 7,
        totalWeek3: 5,
        week1: week7,
        week2: week8,
        week3: week9,
        exist: true
    },
    {
        title: "Марафон з програмування",
        marathone: maraphone4,
        totalMarathone: 3,
        totalWeek1: 6,
        totalWeek2: 6,
        totalWeek3: 6,
        week1: week10,
        week2: week11,
        week3: week12,
        exist: true
    },
    {
        title: "Новорічний марафон",
        marathone: maraphone4,
        totalMarathone: 3,
        totalWeek1: 7,
        week1: week13,
        exist: false
    },
  ];
  console.log(marathonsData)

  const fromColor = "#FFCE07"
  const toColor = "#E95C28"

  return (
    <div style={{
      display: "flex",
      fontFamily: "sans-serif",
      backgroundColor: "#FFCE07",
      padding: "20px",
      columnGap: "20px",
      marginTop: "80px"
    }} className="statistics__container">
      {/* Ліва частина */}
      <div style={{
        flex: 1,
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRight: "1px solid #ddd",
        borderRadius: "30px"
      }} className="statistics__left">
        <div style={{ width: "100%", height: "100%", padding: "20px", backgroundColor: "#fff", borderRadius: "30px"}}>
            {selectedMarathon ? (
            <>
                <h2 style={{marginBottom: "20px"}}>{selectedMarathon.title}</h2>

                {/* Тиждень 1 */}
                <div style={{ marginBottom: "16px" }} className="statistics__week-block">
                <p>Тиждень 1: {selectedMarathon.week1}/{selectedMarathon.totalWeek1}</p>
                <div className="statistics__progress-bar">
                    <div style={{
                    width: `${(selectedMarathon.week1 / selectedMarathon.totalWeek1) * 100}%`,
                    backgroundColor: "#FFCE07",
                    height: "100%"
                    }} />
                </div>
                </div>

                {/* Тиждень 2 */}
                {selectedMarathon.totalWeek2 && (
                <div style={{ marginBottom: "16px" }} className="statistics__week-block">
                <p>Тиждень 2: {selectedMarathon.week2}/{selectedMarathon.totalWeek2}</p>
                <div className="statistics__progress-bar">
                    <div style={{
                    width: `${(selectedMarathon.week2 / selectedMarathon.totalWeek2) * 100}%`,
                    backgroundColor: "#FFCE07",
                    height: "100%"
                    }} />
                </div>
                </div>
                )}

                {/* Тиждень 3 (якщо він є) */}
                {selectedMarathon.totalWeek3 && (
                <div style={{ marginBottom: "16px" }} className="statistics__week-block">
                    <p>Тиждень 3: {selectedMarathon.week3}/{selectedMarathon.totalWeek3}</p>
                    <div className="statistics__progress-bar">
                    <div style={{
                        width: `${(selectedMarathon.week3 / selectedMarathon.totalWeek3) * 100}%`,
                        backgroundColor: "#FFCE07",
                        height: "100%"
                    }} />
                    </div>
                </div>
                )}
                <p>Так тримати! Ти впевнено рухаєшся вперед! Крокуй далі!</p>
                <div style={{alignItems: "center", display: "flex", justifyContent: "center", marginTop: "20px"}}>
                    <a href="https://t.me/fivone_bot?start" className="header_nav_button" style={{marginLeft: "0"}}>Перейти до телеграм</a>
                </div>
            </>
            ) : (
            <>
                <h2 style={{marginBottom: "20px"}}>Інструкція</h2>
                <p style={{fontSize: "20px"}}>Обирай марафон, натискай на діаграму та відслідковуй свій прогрес по тижнях! Зафарбуй всі кружечки жовтим😉 Ми віримо в тебе!</p>
            </>
          )}
        </div>
      </div>

      {/* Права частина */}
      <div className="statistics__right">
        <div className="statistics__grid-gallery">
        {marathonsData.map((marathon, index) => {
            const percentage = ((marathon.week1 + marathon.week2 + marathon.week3) /
            (marathon.totalWeek1 + marathon.totalWeek2 + marathon.totalWeek3)) * 100;

            const percentageMini = (marathon.week1 / marathon.totalWeek1) * 100;

            return (
            <div
                key={index}
                className="statistics__marathon-card"
                onClick={() => {
                    handleUserData()
                    setSelectedMarathon(marathon)
                }}
            >
                <CircularProgress
                percentage={marathon.exist ? percentage : percentageMini}
                colors={gradientColors}
                />
                <p className="statistics__marathon-title">{marathon.title}</p>
            </div>
            );
        })}
        </div>
      </div>
      <div className="statistics__slider mobile-only">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
        >
          {marathonsData.map((marathon, index) => {
            const percentage = ((marathon.week1 + marathon.week2 + marathon.week3) /
            (marathon.totalWeek1 + marathon.totalWeek2 + marathon.totalWeek3)) * 100;
            
            const percentageMini = (marathon.week1 / marathon.totalWeek1) * 100;

            return (<SwiperSlide key={index} className="statistics_swiper_slide">
              <div
                className="statistics__marathon-card"
                onClick={() => setSelectedMarathon(marathon)}
              >
                <CircularProgress
                    percentage={marathon.exist ? percentage : percentageMini}
                    colors={gradientColors}
                />
                <p className="statistics__marathon-title">{marathon.title}</p>

                {/* Тиждень 1 */}
                <div style={{ marginBottom: "16px" }} className="statistics__week-block">
                <p>Тиждень 1: {marathon.week1}/{marathon.totalWeek1}</p>
                <div className="statistics__progress-bar">
                    <div style={{
                    width: `${(marathon.week1 / marathon.totalWeek1) * 100}%`,
                    backgroundColor: "#FFCE07",
                    height: "100%"
                    }} />
                </div>
                </div>

                {/* Тиждень 2 */}
                {marathon.totalWeek2 && (
                <div style={{ marginBottom: "16px" }} className="statistics__week-block">
                <p>Тиждень 2: {marathon.week2}/{marathon.totalWeek2}</p>
                <div className="statistics__progress-bar">
                    <div style={{
                    width: `${(marathon.week2 / marathon.totalWeek2) * 100}%`,
                    backgroundColor: "#FFCE07",
                    height: "100%"
                    }} />
                </div>
                </div>
                )}

                {/* Тиждень 3 (якщо він є) */}
                {marathon.totalWeek3 && (
                <div style={{ marginBottom: "16px" }} className="statistics__week-block">
                    <p>Тиждень 3: {marathon.week3}/{marathon.totalWeek3}</p>
                    <div className="statistics__progress-bar">
                    <div style={{
                        width: `${(marathon.week3 / marathon.totalWeek3) * 100}%`,
                        backgroundColor: "#FFCE07",
                        height: "100%"
                    }} />
                    </div>
                </div>)}
              </div>
            </SwiperSlide>)
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default SplitScreen;