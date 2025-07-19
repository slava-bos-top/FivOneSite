import React, { useState, useEffect } from 'react';
import 'react-circular-progressbar/dist/styles.css';

import "./Statistics.css"

// Твої дані марафонів
// Дані

function CircularProgress({ percentage, colors }) {

  const strokeDasharray = 283;
  const strokeDashoffset = strokeDasharray * (1 - percentage / 100);

  return (
    <svg width="150" height="150" viewBox="-5 -5 110 110">
      <defs>
        <linearGradient id={`grad-${colors[0]}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="none" stroke="#1f1f2f" strokeWidth="12" />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={`url(#grad-${colors[0]})`}
        strokeWidth="12"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="55" textAnchor="middle" fontSize="20" fill="#000" fontWeight="bold">
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

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [image, setImage] = useState("")
  const [maraphone1, setMaraphone1] = useState("")
  const [maraphone2, setMaraphone2] = useState("")
  const [maraphone3, setMaraphone3] = useState("")
  const [maraphone4, setMaraphone4] = useState("")
  const [maraphone5, setMaraphone5] = useState("")
  const [week1, setWeek1] = useState("")
  const [week2, setWeek2] = useState("")
  const [week3, setWeek3] = useState("")
  const [week4, setWeek4] = useState("")
  const [week5, setWeek5] = useState("")
  const [week6, setWeek6] = useState("")
  const [week7, setWeek7] = useState("")
  const [week8, setWeek8] = useState("")
  const [week9, setWeek9] = useState("")
  const [week10, setWeek10] = useState("")
  const [week11, setWeek11] = useState("")
  const [week12, setWeek12] = useState("")
  const [week13, setWeek13] = useState("")

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const { name, surname, photo, isLoggedIn, maraphone1, maraphone2, maraphone3, maraphone4, maraphone5, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13 } = JSON.parse(savedUser);
      if (isLoggedIn) {
        setName(name)
        setSurname(surname)
        setImage(photo)
        setMaraphone1(maraphone1)
        setMaraphone2(maraphone2)
        setMaraphone3(maraphone3)
        setMaraphone4(maraphone4)
        setMaraphone5(maraphone5)
        setWeek1(week1) //
        setWeek2(week2) //
        setWeek3(week3) 
        setWeek4(week4)
        setWeek5(week5)
        setWeek6(week6)
        setWeek7(week7)
        setWeek8(week8)
        setWeek9(week9)
        setWeek10(week10)
        setWeek11(week11)
        setWeek12(week12)
        setWeek13(week13)
        // Наприклад, показати імʼя в Header
      }
    }
  }, []);

  const marathonsData = [
    {
      title: "Марафон 1",
      marathone: maraphone1,
      totalMarathone: 3,
      totalWeek1: 7,
      totalWeek2: 7,
      totalWeek3: 7,
      week1: week1,
      week2: week2,
      week3: week3,
    },
    {
      title: "Марафон 2",
      marathone: maraphone2,
      totalMarathone: 3,
      totalWeek1: 7,
      totalWeek2: 7,
      totalWeek3: 7,
      week1: week4,
      week2: week5,
      week3: week6,
    },
    {
        title: "Марафон 3",
        marathone: maraphone3,
        totalMarathone: 3,
        totalWeek1: 7,
        totalWeek2: 7,
        totalWeek3: 7,
        week1: week7,
        week2: week8,
        week3: week9,
    },
    {
        title: "Марафон 4",
        marathone: maraphone4,
        totalMarathone: 3,
        totalWeek1: 7,
        totalWeek2: 7,
        totalWeek3: 7,
        week1: week10,
        week2: week11,
        week3: week12,
    },
    // {
    //     title: "Марафон 5",
    //     weeks: [
    //       { lessons: [{ completed: true }, { completed: true }] },
    //       { lessons: [{ completed: true }, { completed: true }] }
    //     ]
    // },
    // ... ще 3 марафони
  ];
  console.log(marathonsData)

  return (
    <div style={{
      display: "flex",
      height: "80vh",
      fontFamily: "sans-serif",
      backgroundColor: "#FFCE07",
      padding: "20px",
      columnGap: "20px"
    }}>
      {/* Ліва частина */}
      <div style={{
        flex: 1,
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRight: "1px solid #ddd",
        borderRadius: "30px"
      }}>
        <div style={{ width: "100%", height: "100%", padding: "20px", backgroundColor: "#fff", borderRadius: "30px"}}>
            {selectedMarathon ? (
            <>
                <h2>{selectedMarathon.title}</h2>
                {selectedMarathon.map((week, wIndex) => {
                const percent1 = (week.week1 / week.totalWeek1) * 100;
                const percent2 = (week.week2 / week.totalWeek2) * 100;
                const percent3 = (week.week3 / week.totalWeek3) * 100;

                return (
                    <div key={wIndex}>
                        <div style={{ marginBottom: "16px" }}>
                            <p>Тиждень 1: {week.week1}/{week.totalWeek1}</p>
                            <div style={{
                                background: "#ccc",
                                borderRadius: "5px",
                                height: "10px",
                                overflow: "hidden"
                            }}>
                                <div style={{
                                width: `${percent1}%`,
                                backgroundColor: "#FFCE07",
                                height: "100%"
                                }} />
                            </div>
                        </div>
                        <div style={{ marginBottom: "16px" }}>
                            <p>Тиждень 2: {week.week2}/{week.totalWeek2}</p>
                            <div style={{
                                background: "#ccc",
                                borderRadius: "5px",
                                height: "10px",
                                overflow: "hidden"
                            }}>
                                <div style={{
                                width: `${percent2}%`,
                                backgroundColor: "#FFCE07",
                                height: "100%"
                                }} />
                            </div>
                        </div>
                        <div style={{ marginBottom: "16px" }}>
                            <p>Тиждень 3: {week.week3}/{week.totalWeek3}</p>
                            <div style={{
                                background: "#ccc",
                                borderRadius: "5px",
                                height: "10px",
                                overflow: "hidden"
                            }}>
                                <div style={{
                                width: `${percent3}%`,
                                backgroundColor: "#FFCE07",
                                height: "100%"
                                }} />
                            </div>
                        </div>
                    </div>
                );
                })}
            </>
            ) : (
            <>
                <h2>Інструкція</h2>
                <p>Оберіть один із марафонів справа, щоб побачити детальний прогрес по тижнях.</p>
            </>
          )}
        </div>
      </div>

      {/* Права частина */}
      <div style={{
        flex: 1,
        display: "flex",
        flexWrap: "wrap",
        padding: "20px",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: "30px"
      }}>
        <div style={{maxWidth: "1260px", margin: "0 auto", width: "100%", height: "100%", padding: "20px", backgroundColor: "#fff", borderRadius: "30px"}} className="statistics__grid-gallery">
            {marathonsData.map((marathon, index) => {
                const percentage = (marathon.marathone / marathon.totalMarathone) * 100;

                return (
                    <div
                        key={index}
                        style={{ cursor: "pointer", textAlign: "center" }}
                        onClick={() => setSelectedMarathon(marathon)}
                        >
                        <CircularProgress percentage={percentage} colors={gradients[index % gradients.length]} />
                        <p style={{ fontWeight: "bold", color: "#000", marginTop: "8px" }}>
                            {marathon.title}
                        </p>
                    </div>
                );
            })}
            {/* <div
                key={index}
                style={{ cursor: "pointer", textAlign: "center" }}
                onClick={() => setSelectedMarathon(marathon)}
            >
                <CircularProgress percentage={(maraphone1 / 3) * 100} colors={gradients[index % gradients.length]} />
                <p style={{ fontWeight: "bold", color: "#000", marginTop: "8px" }}>
                    Марафон 1
                </p>
            </div> */}
        </div>
      </div>
    </div>
  );
}

export default SplitScreen;