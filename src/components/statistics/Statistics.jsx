import React, { useState } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Дані
const weeksData = [
  {
    week: 1,
    lessons: [
      { title: "Урок 1", completed: true },
      { title: "Урок 2", completed: false },
      { title: "Урок 3", completed: true }
    ]
  },
  {
    week: 2,
    lessons: [
      { title: "Урок 1", completed: true },
      { title: "Урок 2", completed: true },
      { title: "Урок 3", completed: true }
    ]
  }
];

// Функція для загального прогресу
const calculateOverallProgress = () => {
  const totalLessons = weeksData.reduce((acc, week) => acc + week.lessons.length, 0);
  const completedLessons = weeksData.reduce(
    (acc, week) => acc + week.lessons.filter(l => l.completed).length,
    0
  );
  return Math.round((completedLessons / totalLessons) * 100);
};

function Statistics() {
  const [showDetails, setShowDetails] = useState(false);
  const progress = calculateOverallProgress();

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      {!showDetails ? (
        <div onClick={() => setShowDetails(true)} style={{ cursor: 'pointer' }}>
          <CircularProgressbarWithChildren
            value={progress}
            styles={buildStyles({
              pathColor: 'url(#gradient)',
              trailColor: '#1e1e2f',
              strokeLinecap: 'round'
            })}
          >
            <svg style={{ height: 0 }}>
              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%" stopColor="#FFCE07" />
                  <stop offset="50%" stopColor="#16BAAE" />
                  <stop offset="100%" stopColor="#E95C28" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>
              {progress}%
            </div>
            <div style={{ fontSize: 14, color: '#aaa' }}>Натисни для деталей</div>
          </CircularProgressbarWithChildren>
        </div>
      ) : (
        <div>
          <h3 style={{ textAlign: 'center' }}>Прогрес по тижнях</h3>
          {weeksData.map((week) => {
            const completed = week.lessons.filter(l => l.completed).length;
            const total = week.lessons.length;
            const percentage = Math.round((completed / total) * 100);

            return (
              <div key={week.week} style={{ marginBottom: '20px' }}>
                <p><strong>📅 Тиждень {week.week}</strong> — {completed}/{total} уроків</p>
                <div style={{
                  background: '#1e1e2f',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  height: '16px'
                }}>
                  <div
                    style={{
                      width: `${percentage}%`,
                      height: '100%',
                      background: 'linear-gradient(to right, var(--yellow), var(--cyan), var(--red))',
                      transition: 'width 0.5s ease'
                    }}
                  />
                </div>
              </div>
            );
          })}
          <button onClick={() => setShowDetails(false)} style={{ marginTop: 20 }}>
            ⬅ Назад
          </button>
        </div>
      )}
    </div>
  );
}

export default Statistics;