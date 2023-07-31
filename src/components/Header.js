import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "./ThemeToggle";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import RegistrationButton from "./RegistrationButton";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import LoginButton from "./LoginButton";

import config from '../config';
import "./Style.css";
import "./Header.css";

const Header = ({ isDarkMode, toggleTheme, activeModal, setActiveModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); setIsLoginModalOpen(false);
  
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    setIsModalOpen(false);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsModalOpen(false);
    
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    setIsModalOpen(false);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch(`${config.apiUrl}user/`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("Registration successful");

        setName("");
        setEmail("");
        setPassword("");

        setIsModalOpen(false);
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
    };

    try {
      const response = await fetch(`${config.apiUrl}authorization/`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.accessToken) {
          const { accessToken, refreshToken, expires_in } = data;
         
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("expiresIn", expires_in.toString());
        
          console.log("Login successful");
          console.log(accessToken);
          console.log(refreshToken);
          console.log(expires_in);

          setEmail("");
          setPassword("");
          setIsModalOpen(false);

   

          const s = localStorage.getItem("expiresIn");
          const ss = parseInt(s, 10); 

          let expires_in1 = ss/1000;
          const dateObj = new Date(expires_in1* 1000);
          const formattedDate = dateObj.toLocaleString();
          console.log(formattedDate);


        } else {
          console.log("Access token is missing in the server response");
        }
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
    handleCloseLoginModal();
    window.location.reload();
    
  };

  const refreshTokenFunc = async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedRefreshToken) {
      try {
        console.log(JSON.stringify({ refreshToken: storedRefreshToken }));
        const response = await fetch(`${config.apiUrl}refresh/`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: storedRefreshToken }),
        });

        if (response.ok) {
         
            const data = await response.json();
            if (data && data.accessToken) {
              const { accessToken, refreshToken, expires_in } = data;
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("refreshToken", refreshToken);
              localStorage.setItem("expiresIn", expires_in.toString());

            } else {
              console.log("Access token is missing in the token refresh response");
            }
          } else {
            console.log("Token refresh failed");
          }
        } catch (error) {
          console.log("Error:", error);
        }
      } else {
        console.log("Refresh token is missing");
      }
    };
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const expiresIn = localStorage.getItem("expiresIn");
 
    if (!storedAccessToken || !expiresIn) {
      refreshTokenFunc();
    } else {
      const expiresInMilliseconds = parseInt(expiresIn, 10);

      if (Date.now() >= expiresInMilliseconds) {
        refreshTokenFunc();
      } else {
    
        const timeLeft = expiresInMilliseconds - Date.now()- 5 * 60 * 1000;
        const timerId = setTimeout(refreshTokenFunc, timeLeft);
  
      
        return () => clearTimeout(timerId);
      }
    }
  }, []);

 
  const handleButtonClick = () => {
    // Ваш код обработки нажатия кнопки
    console.log('Кнопка была нажата!');
    setSearchQuery(''); // Очищаем поле ввода
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={`header ${isDarkMode ? "dark" : "light"}`}>
      
    
      <h1 className="headerLogo">

        <span className="letter">B</span>udget <span className="letter">B</span>uddy</h1>  

         <h1 className="headerLogoMobile">

        <span className="letter">BB</span>
        
      </h1>   
      <div className="searchContainer">
      <div className="inputContainer">
        <input
          className="searchInput"
          type="text"
          placeholder="search"
          value={searchQuery}
          onChange={handleChange}
        />
        <button className="searchButton" onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>

      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <LoginButton
        isDarkMode={isDarkMode}
        handleOpenLoginModal={handleOpenLoginModal}
      />

      {isLoginModalOpen && (
        <div className="modal">
          <div
            className={`modalLog modalContent ${isDarkMode ? "dark" : "light"}`}
          >
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
              >
                Login
              </button>
              <button
                className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
                onClick={handleCloseLoginModal}
              >
                Close
              </button>
           
              <p className="textModal"> create a new account</p>
              <button
                className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
                onClick={handleOpenModal}
              >
               Create   <FontAwesomeIcon icon={faUserPlus}/>
              </button>
            </form> 
          </div> 

        </div>
      )}

      {/* <RegistrationButton
        isDarkMode={isDarkMode}
        handleOpenModal={handleOpenModal}
      /> */}

      {isModalOpen && (
        <div className="modal">
          <div
            className={`modalLog modalContent ${isDarkMode ? "dark" : "light"}`}
          >
            <h3>Registration</h3>
            <form onSubmit={handleRegistration}>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
              >
                Register
              </button>
              <button
                className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
                onClick={handleCloseModal} 
              >
                Close
              </button>
            
             
            </form>
          </div>  

        </div>
      )}

      {/* <div
        className={`burger ${isMenuOpen ? "open" : ""} ${
          isDarkMode ? "dark" : "light"
        }`}
        onClick={handleToggleMenu}
      >
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </div>
      {isMenuOpen && (
        <div className={`menu ${isDarkMode ? "dark" : "light"}`}>
          <button
            className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
            onClick={handleOpenModal}
          >
            Registration
          </button>
          <button
            className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
            onClick={handleOpenLoginModal}
          >
            Login
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Header;