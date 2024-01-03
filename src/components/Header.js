import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserPlus,
  faEye,
  faEyeSlash,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import SearchPage from "./SearchPage";
import PersonalCabinet from "./PersonalCabinet";
import ThemeToggle from "./ThemeToggle";
import LoginButton from "./LoginButton";

import config from "../config";
import "./Style.css";
import "./Header.css";
import "./PersonalCabinet";

const Header = ({
  isDarkMode,
  toggleTheme,
  activeAccount,
  setActiveAccount,
  setIsLoggedIn,
  isDashboardView,
  toggleInstructions,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCabinetOpen, setIsCabinetOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );

  const toggleCabinet = () => {
    setIsCabinetOpen(!isCabinetOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsLoginModalOpen(false);
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

  useEffect(() => {
    const fetchAccountById = async (accountId) => {
      try {
        const token = localStorage.getItem("accessToken");
        const headersWithToken = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await fetch(`${config.apiUrl}accounts/${accountId}`, {
          headers: headersWithToken,
        });

        if (response.ok) {
          const account = await response.json();
          setActiveAccount(account);
        } else {
          console.log("Failed to fetch account by id");
        }
      } catch (error) {
        console.log("Error fetching account by id:", error);
      }
    };
    const lastVisitedAccountId = localStorage.getItem("lastVisitedAccount");
    if (lastVisitedAccountId) {
      fetchAccountById(lastVisitedAccountId);
    }
  }, [setActiveAccount]);

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

        handleOpenLoginModal();
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
          const { name, email, accessToken, refreshToken, expires_in } = data;

          setUserName(name);
          setUserEmail(email);
          setIsLoggedIn(true);

          localStorage.setItem("userName", name);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("expiresIn", expires_in.toString());

          // localStorage.setItem("lastVisitedAccount", activeAccount.id);
          if (activeAccount && activeAccount.id) {
            localStorage.setItem("lastVisitedAccount", activeAccount.id);
          }

          console.log("Login successful");

          setEmail("");
          setPassword("");
          setIsModalOpen(false);

          console.log(data);

          const s = localStorage.getItem("expiresIn");
          const ss = parseInt(s, 10);

          let expires_in1 = ss / 1000;
          const dateObj = new Date(expires_in1 * 1000);
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
            window.location.reload();
          } else {
            console.log(
              "Access token is missing in the token refresh response"
            );
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
    const savedUserName = localStorage.getItem("userName");
    const savedUserEmail = localStorage.getItem("userEmail");
    if (savedUserName && savedUserEmail) {
      setUserName(savedUserName);
      setUserEmail(savedUserEmail);
    }

    if (!storedAccessToken || !expiresIn) {
      refreshTokenFunc();
    } else {
      const expiresInMilliseconds = parseInt(expiresIn, 10);

      if (Date.now() >= expiresInMilliseconds) {
        refreshTokenFunc();
      } else {
        const timeLeft = expiresInMilliseconds - Date.now() - 5 * 60 * 1000;
        const timerId = setTimeout(refreshTokenFunc, timeLeft);

        return () => clearTimeout(timerId);
      }
    }
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("modalWindow")) {
        handleCloseModal();
        handleCloseLoginModal();
      }
    };

    if (isModalOpen || isLoginModalOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isModalOpen, isLoginModalOpen]);

  return (
    <div className={`header ${isDarkMode ? "dark" : "light"}`}>
      <h1 className="headerLogo" onClick={reloadPage}>
        <span className="headerLogoletter">B</span>udget{" "}
        <span className="headerLogoletter">B</span>uddy
      </h1>

      <h1 className="headerLogoMobile">
        <span className="headerLogoletter" onClick={reloadPage}>
          BB
        </span>
      </h1>

      <SearchPage />

      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <LoginButton
        isDarkMode={isDarkMode}
        handleOpenLoginModal={handleOpenLoginModal}
      />

      {isLoginModalOpen && (
        <div className="modalWindow">
          <div
            className={`modalLogin modalContent ${
              isDarkMode ? "dark" : "light"
            }`}
          >
            <h3 className={`modalText ${isDarkMode ? "dark" : "light"}`}>
              Login
            </h3>
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

              <div
                type="button"
                className="lockPassword"
                onClick={handlePasswordVisibility}
              >
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
                className={`buttonCLose modalButtonLog ${
                  isDarkMode ? "dark" : "light"
                }`}
                onClick={handleCloseLoginModal}
              >
                Close
              </button>

              <p className={`modalText ${isDarkMode ? "dark" : "light"}`}>
                {" "}
                create a new account
              </p>
              <button
                className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
                onClick={handleOpenModal}
              >
                Create <FontAwesomeIcon icon={faUserPlus} />
              </button>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modalWindow">
          <div
            className={`modalLogin modalContent ${
              isDarkMode ? "dark" : "light"
            }`}
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
                <div
                  type="button"
                  className="lockPassword"
                  onClick={handlePasswordVisibility}
                >
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
                className={`buttonCLose modalButtonLog ${
                  isDarkMode ? "dark" : "light"
                }`}
                onClick={handleCloseModal}
              >
                Close
              </button>

              <p className={`modalText ${isDarkMode ? "dark" : "light"}`}>
                {" "}
                enter login
              </p>
              <button
                className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
                onClick={handleOpenLoginModal}
              >
                Login <FontAwesomeIcon icon={faArrowRightToBracket} />
              </button>
            </form>
          </div>
        </div>
      )}
      {userName && userEmail && (
        <div className="buttonCabinet">
          {isCabinetOpen ? (
            <PersonalCabinet
              name={userName}
              email={userEmail}
              isDarkMode={isDarkMode}
              onClose={toggleCabinet}
            />
          ) : (
            <button
              className={`buttonCab ${isDarkMode ? "dark" : "light"}`}
              onClick={toggleCabinet}
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
