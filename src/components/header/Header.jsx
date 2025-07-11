import "./Header.css";
import { Link } from 'react-router-dom';

import { coursesData } from '../Gallery/coursesData';
import { competitionData } from "../Gallery/competitionData";
import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClickAbout = (id) => {
    window.scrollTo(0, 3700);
  };

  const handleNavClickReview = (id) => {
    window.scrollTo(0, 4500);
  };

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="header">
      <div className="container">
        <div className="header_row">
          <div className="header_logo">
            <img
              src="https://optim.tildacdn.one/tild3533-3039-4032-a239-376535663937/-/resize/240x/-/format/webp/logo.png.webp"
              alt="logo"
              style={{ width: "150px" }}
            />
          </div>

          <div className="burger" onClick={toggleMenu}>
            <span className={`burger-line ${menuOpen ? "open" : ""}`}></span>
            <span className={`burger-line ${menuOpen ? "open" : ""}`}></span>
            <span className={`burger-line ${menuOpen ? "open" : ""}`}></span>
          </div>

          <nav className={`header_nav ${menuOpen ? "open" : ""}`}>
            <ul className="header_nav_list">
              <li><a href="#aboutUs" className="dropdown_button">Про центр</a></li>

              <li className="dropdown">
                <button className="dropdown_button">Наші курси</button>
                <ul className="dropdown-menu">
                  {coursesData.map((course, i) => (
                    <li key={i}>
                      <Link
                        to="/course"
                        state={course}
                        className="dropdown-menu_element"
                        onClick={() => setMenuOpen(false)}
                      >
                        {course.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="dropdown">
                <button className="dropdown_button">Марафони</button>
                <ul className="dropdown-menu">
                  {competitionData.map((item, i) => (
                    <li key={i}>
                      <Link
                        to="/marathon"
                        state={item}
                        className="dropdown-menu_element"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li><a href="#reviewMain" className="dropdown_button">Відгуки</a></li>
              <li>
                <Link to="/registration" className="header_nav_button">Зареєструватись</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
