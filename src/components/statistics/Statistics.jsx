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
  const [maraphone1, setMaraphone1] = useState(2)
  const [maraphone2, setMaraphone2] = useState(2)
  const [maraphone3, setMaraphone3] = useState(2)
  const [maraphone4, setMaraphone4] = useState(2)
  const [maraphone5, setMaraphone5] = useState(2)
  const [week1, setWeek1] = useState(2)
  const [week2, setWeek2] = useState(2)
  const [week3, setWeek3] = useState(2)
  const [week4, setWeek4] = useState(2)
  const [week5, setWeek5] = useState(2)
  const [week6, setWeek6] = useState(2)
  const [week7, setWeek7] = useState(2)
  const [week8, setWeek8] = useState(2)
  const [week9, setWeek9] = useState(2)
  const [week10, setWeek10] = useState(2)
  const [week11, setWeek11] = useState(2)
  const [week12, setWeek12] = useState(2)
  const [week13, setWeek13] = useState(2)

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const { name, surname, photo, isLoggedIn, maraphone1, maraphone2, maraphone3, maraphone4, maraphone5, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13 } = JSON.parse(savedUser);
      if (isLoggedIn) {
        console.log(maraphone1)
        setName(name)
        setSurname(surname)
        setImage(photo)
        setMaraphone1(Number(maraphone1))
        setMaraphone2(Number(maraphone2))
        setMaraphone3(Number(maraphone3))
        setMaraphone4(Number(maraphone4))
        setMaraphone5(Number(maraphone5))
        setWeek1(Number(week1)) //
        setWeek2(Number(week2)) //
        setWeek3(Number(week3)) 
        setWeek4(Number(week4))
        setWeek5(Number(week5))
        setWeek6(Number(week6))
        setWeek7(Number(week7))
        setWeek8(Number(week8))
        setWeek9(Number(week9))
        setWeek10(Number(week10))
        setWeek11(Number(week11))
        setWeek12(Number(week12))
        setWeek13(Number(week13))
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
    {
        title: "Марафон 5",
        marathone: maraphone4,
        totalMarathone: 3,
        totalWeek1: 7,
        week1: week13,
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
      columnGap: "20px",
      paddingTop: "200px"
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

                {/* Тиждень 1 */}
                <div style={{ marginBottom: "16px" }}>
                <p>Тиждень 1: {selectedMarathon.week1}/{selectedMarathon.totalWeek1}</p>
                <div style={{
                    background: "#ccc",
                    borderRadius: "5px",
                    height: "10px",
                    overflow: "hidden"
                }}>
                    <div style={{
                    width: `${(selectedMarathon.week1 / selectedMarathon.totalWeek1) * 100}%`,
                    backgroundColor: "#FFCE07",
                    height: "100%"
                    }} />
                </div>
                </div>

                {/* Тиждень 2 */}
                {selectedMarathon.totalWeek2 && (
                <div style={{ marginBottom: "16px" }}>
                <p>Тиждень 2: {selectedMarathon.week2}/{selectedMarathon.totalWeek2}</p>
                <div style={{
                    background: "#ccc",
                    borderRadius: "5px",
                    height: "10px",
                    overflow: "hidden"
                }}>
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
                <div style={{ marginBottom: "16px" }}>
                    <p>Тиждень 3: {selectedMarathon.week3}/{selectedMarathon.totalWeek3}</p>
                    <div style={{
                    background: "#ccc",
                    borderRadius: "5px",
                    height: "10px",
                    overflow: "hidden"
                    }}>
                    <div style={{
                        width: `${(selectedMarathon.week3 / selectedMarathon.totalWeek3) * 100}%`,
                        backgroundColor: "#FFCE07",
                        height: "100%"
                    }} />
                    </div>
                </div>
                )}
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