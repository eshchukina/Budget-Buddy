import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from "./ThemeToggle";
import RegistrationButton from "./RegistrationButton";
import LoginButton from "./LoginButton";

import './Style.css';
import './Header.css';

const Header = ({ isDarkMode, toggleTheme, activeModal, setActiveModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleOpenModal1 = () => {
    setActiveModal('headerModal');
  };


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };


  
  const handleRegistration = async (e) => {
    e.preventDefault();
  
    const newUser = {
      name,
      email,
      password
    };
  
    try {
      const response = await fetch("http://192.168.1.30:1323/user/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
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
  
//===========
const handleLogin = async (e) => {
  e.preventDefault();

  const newUser = {
    email,
    password
  };

  try {
    const response = await fetch("http://192.168.1.30:1323/authorization/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.accessToken) {
        const { accessToken, refreshToken, int } = data;
        console.log("Login successful");
        console.log(accessToken);
        console.log(refreshToken);
        console.log(int);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("intVariable", int.toString());


        setEmail("");
        setPassword("");
        setIsModalOpen(false);
      
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
};

const refreshTokenFunc = async () => {
  const storedRefreshToken = localStorage.getItem("refreshToken");

  if (storedRefreshToken) {
    try {
      console.log( JSON.stringify({ refreshToken: storedRefreshToken }));
      const response = await fetch("http://192.168.1.30:1323/refresh/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken: storedRefreshToken })
        
      });

      if (response.ok) {
        try {
          const data = await response.json();
          if (data && data.accessToken) {
            const { accessToken,refreshToken } = data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

          } else {
            console.log("Access token is missing in the token refresh response");
          }
        } catch (error) {
          console.log("Error parsing token refresh response:", error);
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


// useEffect(() => {
//   const storedAccessToken = localStorage.getItem("accessToken");

//   if (!storedAccessToken) {
//     refreshTokenFunc();
//   }

//   const interval = setInterval(refreshTokenFunc, 5000);
//   return () => clearInterval(interval);
// }, []);





 
  

  return (
    <div className={`header ${isDarkMode ? "dark" : "light"}`}>
      <h1>
        <span className="letter">B</span>udget <span class="letter">B</span>uddy
      </h1>
     
         <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

     
         <LoginButton
        isDarkMode={isDarkMode}
        handleOpenLoginModal={handleOpenLoginModal}
      />

      {isLoginModalOpen && (
        <div className="modal">
          <div className={`modalLog modalContent ${isDarkMode ? "dark" : "light"}`}>
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
              <button type="submit" className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}>Login</button>
              <button className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`} onClick={handleCloseLoginModal}>Close</button>
            </form>
          </div>
        </div>
      )}








<RegistrationButton
        isDarkMode={isDarkMode}
        handleOpenModal={handleOpenModal}
      />

      {isModalOpen && (
        <div className="modal">
          <div className={`modalLog modalContent ${isDarkMode ? "dark" : "light"}`}>
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
              <button type="submit" className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}>Register</button>
              <button className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`} onClick={handleCloseModal}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
