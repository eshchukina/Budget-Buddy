import React, { useState } from "react";
import { faMoon, faSun, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Style.css';

const Header = ({ isDarkMode, toggleTheme }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    // Perform registration logic here using name, email, and password
    console.log("Registering user:", name, email, password);
    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
    // Close modal
    setIsModalOpen(false);
  };

  return (
    <div className={`header ${isDarkMode ? "dark" : "light"}`}>
      <h1>Budget Buddy</h1>
      <button
        className={`buttonTheme ${isDarkMode ? "dark" : "light"}`}
        onClick={handleThemeToggle}
      >
        {isDarkMode ? (
          <FontAwesomeIcon icon={faMoon} style={{ color: "#bc881b" }} />
        ) : (
          <FontAwesomeIcon icon={faSun} style={{ color: "#bc881b" }} />
        )}
      </button>
      <button className={`logIn ${isDarkMode ? "dark" : "light"}`} onClick={handleOpenModal}>
        <FontAwesomeIcon icon={faUserPlus} style={{ color: "#bc881b" }} />
      </button>
      {isModalOpen && (
         <div className="modal">
        <div className={`modalLog modalContent ${isDarkMode ? "dark" : "light"}`}>
        <h3>Enter the data:</h3>
          <form onSubmit={handleRegistration}>
            <input
              type="text"
              placeholder="ame"
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
            /></form>
            <button type="submit" className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}>Register</button>
          
          <button className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`} onClick={handleCloseModal}>Close</button>
        </div> </div>
      )}
    </div>
  );
};

export default Header;
