import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "../Style.css";
import "../header/Header.css";

const LoginModal = ({
  isDarkMode,
  isOpen,
  onClose,
  onRegisterOpen,
  handleLogin,
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
        <h3 className={`modalText ${isDarkMode ? "dark" : "light"}`}>Login</h3>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <button
            type="submit"
            className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
          >
            Login
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
            create a new account
          </p>
          <button
            className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
            onClick={onRegisterOpen}
          >
            Create <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
