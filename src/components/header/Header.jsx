import "./Header.css";
import { Link } from 'react-router-dom';

import { coursesData } from '../Gallery/coursesData';
import { competitionData } from "../Gallery/competitionData";
import { useState, useEffect } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signIn, setSignIn] = useState(false)
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [image, setImage] = useState("")
  const [showInfo, setShowInfo] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const toggleInfo = () => {
    setShowInfo((prev) => !prev);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const { name, surname, photo, isLoggedIn } = JSON.parse(savedUser);
      if (isLoggedIn) {
        setSignIn(true)
        setName(name)
        setSurname(surname)
        setImage(photo)
        console.log(image)
        // Наприклад, показати імʼя в Header
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setSignIn(false)
  };

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
                {signIn ? (
                  <div style={{ marginLeft: "20px", display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div style={{ position: "relative" }}>
                      <img
                        src={image}
                        alt="phot_user"
                        onClick={toggleInfo}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          border: showInfo ? "2px solid #007bff" : "none",
                          marginTop: "10px"
                        }}
                      />
              
                      {showInfo && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            padding: "10px",
                            borderRadius: "10px",
                            zIndex: 999,
                            whiteSpace: "nowrap",
                            minWidth: "120px",
                            marginTop: "8px",
                            alignItems: "center"
                          }}
                        >
                          <p style={{ fontSize: "14px", margin: "4px 0" }}>{name}</p>
                          <p style={{ fontSize: "14px", margin: "4px 0" }}>{surname}</p>
                          <button onClick={handleLogout} style={{ fontSize: "14px", marginLeft: 0, marginRight: 0 }} className="header_nav_button">Вийти</button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to="/login" className="header_nav_button">Зареєструватись</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
