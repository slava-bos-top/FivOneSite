import React, { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';

// Твої дані марафонів
// Дані
const marathonsData = [
    {
      title: "Марафон 1",
      weeks: [
        { lessons: [{ completed: true }, { completed: true }, { completed: false }] },
        { lessons: [{ completed: true }, { completed: false }, { completed: false }] }
      ]
    },
    {
      title: "Марафон 2",
      weeks: [
        { lessons: [{ completed: true }, { completed: true }] },
        { lessons: [{ completed: true }, { completed: true }] }
      ]
    },
    {
        title: "Марафон 3",
        weeks: [
          { lessons: [{ completed: true }, { completed: true }, { completed: false }] },
          { lessons: [{ completed: true }, { completed: false }, { completed: false }] }
        ]
    },
    {
        title: "Марафон 4",
        weeks: [
          { lessons: [{ completed: true }, { completed: true }] },
          { lessons: [{ completed: true }, { completed: true }] }
        ]
    },
    {
        title: "Марафон 5",
        weeks: [
          { lessons: [{ completed: true }, { completed: true }] },
          { lessons: [{ completed: true }, { completed: true }] }
        ]
    },
    // ... ще 3 марафони
  ];

function CircularProgress({ percentage, colors }) {
  const strokeDasharray = 283;
  const strokeDashoffset = strokeDasharray * (1 - percentage / 100);

  return (
    <svg width="95" height="95" viewBox="0 0 120 120">
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
      <text x="50" y="55" textAnchor="middle" fontSize="20" fill="white" fontWeight="bold">
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

  return (
    <div style={{
      display: "flex",
      height: "100vh",
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
                {selectedMarathon.weeks.map((week, wIndex) => {
                const completed = week.lessons.filter(l => l.completed).length;
                const percent = (completed / week.lessons.length) * 100;

                return (
                    <div key={wIndex} style={{ marginBottom: "16px" }}>
                    <p>Тиждень {wIndex + 1}: {completed}/{week.lessons.length}</p>
                    <div style={{
                        background: "#ccc",
                        borderRadius: "5px",
                        height: "10px",
                        overflow: "hidden"
                    }}>
                        <div style={{
                        width: `${percent}%`,
                        backgroundColor: "#FFCE07",
                        height: "100%"
                        }} />
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
        <div style={{width: "100%", height: "100%", padding: "20px", backgroundColor: "#fff", borderRadius: "30px"}}>
            {marathonsData.map((marathon, index) => {
            const totalLessons = marathon.weeks.flatMap(w => w.lessons).length;
            const completedLessons = marathon.weeks.flatMap(w => w.lessons.filter(l => l.completed)).length;
            const percentage = (completedLessons / totalLessons) * 100;

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
        </div>
      </div>
    </div>
  );
}

export default SplitScreen;