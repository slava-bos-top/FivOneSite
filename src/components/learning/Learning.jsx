import React from 'react';
import './Learning.css';

const rawItems = [
  {
    text: 'Telegram',
    hoverText: "Заняття проходить у Месенджері Telegram — захищеному та зручному додатку"
  },
  {
    text: '5-6 інтерактивів за заняття',
    hoverText: "Усі заняття містять інтерактивні завдання (чат-боти, квізи, опитування), які допомагають засвоїти матеріал уроку"
  },
  {
    text: 'Підтримка у чаті 24/7',
    hoverText: "На занятті учні отримують зворотній зв'язок від лектора, а після — комунікують у Telegram-чаті групи. Вони можуть ставити додаткові запитання та спілкуватись з друзями"
  },
  {
    text: 'Можливість перегляду запису заняття',
    hoverText: "Ви можете отримувати завдання у будь-який зручний час і передивлятись урок стільки разів, скільки це необхідно"
  },
  {
    text: "Доступність та гарний зв'язок",
    hoverText: "Приєднуватись до заняття можна як з комп'ютера, так і з телефона, у будь-якому місці з гарним інтернет-зв'язком"
  },
  {
    text: 'Супровід ментором під час навчання',
    hoverText: "Кожна група має свого ментора, який/а допомагає з поясненням матеріалу, підготовкою до практичних завдань та стає кращим другом під час начання"
  },
  {
    text: 'Цікаві домашні завдання',
    hoverText: "Після кожного заняття учні отримують цікаві домашні завдання, які хочеться виконувати"
  },
  {
    text: 'Командні завдання',
    hoverText: "Заняття включають командні завдання на обговорення, дискусії, вирішення проблемних питань та створення спільних проєктів"
  }
];

const Learning = () => {
  const radius = 200;
  const centerOffset = 50;
  const arrowImg = 'https://optim.tildacdn.one/tild6633-6131-4137-b762-656130353939/-/resize/240x/-/format/webp/noroot.png.webp';
  const isMobile = window.innerWidth <= 768;

  const points = rawItems.map((item, idx) => {
    const angle = (idx / rawItems.length) * Math.PI * 2 - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { ...item, angle, x, y };
  });

  return (
    <div className="learning-container">
      <div className="title">
        <h2>Як проходить навчання?</h2>
      </div>
        <div className="mobile-layout">
          <div className="mobile-column left-column">
            {rawItems.slice(0, 4).map((point, idx) => (
              <div key={idx} className="mobile-item">
                <div className="dot" />
                <div className="dot_text">{point.text}</div>
              </div>
            ))}
          </div>

          <div className="phone-wrapper">
            <img
              src="https://optim.tildacdn.one/tild3030-3535-4630-a138-613435333966/-/resize/458x/-/format/webp/whitephone_empty.png.webp"
              alt="phone"
              className="phone"
            />
          </div>

          <div className="mobile-column right-column">
            {rawItems.slice(4).map((point, idx) => (
              <div key={idx + 4} className="mobile-item">
                <div className="dot" />
                <div className="dot_text">{point.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='desctop-block'>
          <div className="phone-wrapper">
            <img
              src="https://optim.tildacdn.one/tild3030-3535-4630-a138-613435333966/-/resize/458x/-/format/webp/whitephone_empty.png.webp"
              alt="phone"
              className="phone"
            />
          </div>

          {/* Крапки + тексти */}
          {points.map((point, idx) => (
            <React.Fragment key={idx}>
              <div
                className="dot_text"
                style={{
                  top: `calc(${centerOffset + 20}% + ${point.y * 1.2}px)`,
                  left: `calc(${centerOffset}% + ${point.x * 1.5}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {point.text}
              </div>

              <div
                className="dot-container"
                style={{
                  top: `calc(${centerOffset + 20}% + ${point.y}px)`,
                  left: `calc(${centerOffset}% + ${point.x}px)`,
                }}
              >
                <div className="tooltip-wrapper">
                  <div className="dot" />
                  <div className="tooltip">{point.hoverText}</div>
                </div>
              </div>
            </React.Fragment>
          ))}

          {/* Стрілки */}
          {points.map((point, idx) => {
            const next = points[(idx + 1) % points.length];
            const midX = (point.x + next.x) / 2;
            const midY = (point.y + next.y) / 2;
            const dx = next.x - point.x;
            const dy = next.y - point.y;
            const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);

            return (
              <img
                key={`arrow-${idx}`}
                src={arrowImg}
                alt="arrow"
                className="arrow-img"
                style={{
                  position: 'absolute',
                  top: `calc(${centerOffset + 20}% + ${midY}px)`,
                  left: `calc(${centerOffset}% + ${midX}px)`,
                  transform: `translate(-50%, -50%) rotate(${angleDeg + 180}deg)`,
                  width: '50px',
                }}
              />
            );
          })}
        </div>
    </div>
  );
};

export default Learning;