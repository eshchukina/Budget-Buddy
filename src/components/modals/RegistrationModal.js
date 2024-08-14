import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../Style.css";
import "../header/Header.css";

const RegisterModal = ({
  isDarkMode,
  isOpen,
  onClose,
  onLoginOpen,
  handleRegistration,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!isOpen) return null;

  return (
    <div className="modalWindow">
      <div
        className={`modalLogin modalContent ${isDarkMode ? "dark" : "light"}`}
      >
        <h3 className={`modalText ${isDarkMode ? "dark" : "light"}`}>
          Registration
        </h3>
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
          <div className="passwordInputContainer">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="lockPassword" onClick={handlePasswordVisibility}>
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
          >
            Register
          </button>
          <button
            className={`buttonClose modalButtonLog ${
              isDarkMode ? "dark" : "light"
            }`}
            onClick={onClose}
          >
            Close
          </button>
          <p className={`modalText ${isDarkMode ? "dark" : "light"}`}>
            enter login
          </p>
          <button
            className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
            onClick={onLoginOpen}
          >
            Login <FontAwesomeIcon icon={faArrowRightToBracket} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
