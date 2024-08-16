import React, { useState, useEffect } from "react";
import RegistrationModal from "../modals/RegistrationModal";
import LoginModal from "../modals/LoginModal";
import config from "../../config";
import "../Style.css";
import "./Header.css";
import Button from "../buttons/Button";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Header = ({ isDarkMode, activeAccount, setActiveAccount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let userName = localStorage.getItem("userName") || "user";




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
      const response = await fetch(`${config.apiUrl}user`, {
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
      const response = await fetch(`${config.apiUrl}authorization`, {
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
          const { name, accessToken, refreshToken, expires_in } = data;

          localStorage.setItem("userName", name);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("expiresIn", expires_in.toString());
       
          
          if (activeAccount && activeAccount.id) {
            localStorage.setItem("lastVisitedAccount", activeAccount.id);
          }

          console.log("Login successful");
          setEmail("");
          setPassword("");
          setIsModalOpen(false);

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
        const response = await fetch(`${config.apiUrl}refresh`, {
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
            //window.location.reload();
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
    <>
      <div className={`header ${isDarkMode ? "dark" : "light"}`}>
        <h1 className="headerLogo" onClick={reloadPage}>
          <span className="headerLogoletter">
    
         Hello, {userName}!</span>
        </h1>

        <Button
          text=""
          onClick={handleOpenLoginModal}
          icon={faArrowRightToBracket}
          iconColor="#ffcd38"
        />
      </div>
      <LoginModal
        isDarkMode={isDarkMode}
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onRegisterOpen={handleOpenModal}
        handleLogin={handleLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <RegistrationModal
        isDarkMode={isDarkMode}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLoginOpen={handleOpenLoginModal}
        handleRegistration={handleRegistration}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </>
  );
};

export default Header;
