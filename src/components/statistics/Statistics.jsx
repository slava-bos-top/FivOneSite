import React, { useState } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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

// Функція для загального прогресу
function CircularProgress({ percentage, colors }) {
    const strokeDasharray = 283; // (2 * π * R) для R = 45
    const strokeDashoffset = strokeDasharray * (1 - percentage / 100);
  
    return (
      <svg width="100" height="100" viewBox="0 0 100 100">
        <defs>
          <linearGradient id={`grad-${colors[0]}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#1f1f2f"
          strokeWidth="12"
        />
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
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fontSize="20"
          fill="white"
          fontWeight="bold"
        >
          {Math.round(percentage)}%
        </text>
      </svg>
    );
  }



function Statistics() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const gradients = [
      ["#FFCE07", "#E95C28"], // yellow-red
      ["#94BF47", "#16BAAE"], // green-cyan
      ["#16BAAE", "#FFCE07"],
      ["#E95C28", "#94BF47"],
      ["#94BF47", "#FFCE07"]
    ];
  
    return (
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", backgroundColor: "#FFCE07" }}>
        {marathonsData.map((marathon, index) => {
          const totalLessons = marathon.weeks.flatMap(w => w.lessons).length;
          const completedLessons = marathon.weeks.flatMap(w => w.lessons.filter(l => l.completed)).length;
          const percentage = (completedLessons / totalLessons) * 100;
  
          return (
            <div key={index} style={{ textAlign: "center" }}>
              <div onClick={() => setExpandedIndex(index === expandedIndex ? null : index)} style={{ cursor: "pointer" }}>
                <CircularProgress percentage={percentage} colors={gradients[index % gradients.length]} />
                <p style={{ color: "#fff", fontWeight: "bold" }}>{marathon.title}</p>
              </div>
  
              {expandedIndex === index && (
                <div style={{ marginTop: "10px", color: "#fff" }}>
                  {marathon.weeks.map((week, wIndex) => {
                    const completed = week.lessons.filter(l => l.completed).length;
                    const percent = (completed / week.lessons.length) * 100;
  
                    return (
                      <div key={wIndex} style={{ marginBottom: "8px" }}>
                        <p>Тиждень {wIndex + 1}: {completed}/{week.lessons.length}</p>
                        <div style={{
                          background: "#333",
                          borderRadius: "4px",
                          overflow: "hidden",
                          height: "10px",
                          width: "100%"
                        }}>
                          <div style={{
                            width: `${percent}%`,
                            height: "100%",
                            background: gradients[index % gradients.length][0],
                            transition: "width 0.3s ease"
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
}

export default Statistics;