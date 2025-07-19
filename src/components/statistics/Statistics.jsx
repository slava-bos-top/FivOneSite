import React, { useState } from 'react';

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
  // додай інші тижні
];

function Statistics() {
  const [expandedWeek, setExpandedWeek] = useState(null);

  const completedWeeks = weeksData.filter(week =>
    week.lessons.every(lesson => lesson.completed)
  ).length;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📈 Прогрес марафону</h2>
      <p>✅ Завершено тижнів: {completedWeeks} з {weeksData.length}</p>

      {weeksData.map((week) => {
        const lessonsCompleted = week.lessons.filter(l => l.completed).length;
        const isCompleted = lessonsCompleted === week.lessons.length;
        const isExpanded = expandedWeek === week.week;

        return (
          <div key={week.week} style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
            backgroundColor: isCompleted ? "#e6ffe6" : "#f9f9f9"
          }}>
            <div
              onClick={() =>
                setExpandedWeek(isExpanded ? null : week.week)
              }
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span>
                {isExpanded ? "🔽" : "▶️"} Тиждень {week.week} — {lessonsCompleted}/{week.lessons.length} уроків
              </span>
            </div>

            {/* Прогрес-бар */}
            <div style={{
              height: "8px",
              backgroundColor: "#ddd",
              borderRadius: "4px",
              overflow: "hidden",
              marginTop: "6px",
              marginBottom: isExpanded ? "10px" : "0"
            }}>
              <div style={{
                width: `${(lessonsCompleted / week.lessons.length) * 100}%`,
                height: "100%",
                backgroundColor: "#4caf50"
              }} />
            </div>

            {isExpanded && (
              <ul style={{ marginTop: "10px" }}>
                {week.lessons.map((lesson, i) => (
                  <li key={i}>
                    {lesson.completed ? "✅" : "❌"} {lesson.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Statistics;