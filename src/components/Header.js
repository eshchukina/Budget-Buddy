import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ThemeToggle from "./ThemeToggle";
import { faUserPlus,  faEye, faEyeSlash, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"; 
import LoginButton from "./LoginButton";

import config from '../config';
import "./Style.css";
import "./Header.css";
import SearchPage from "./SearchPage";

const Header = ({ isDarkMode, toggleTheme, activeAccount, setActiveAccount }) => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [showPassword, setShowPassword] = useState(false); 



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
        
          localStorage.setItem("lastVisitedAccount", activeAccount.id);

         
          console.log("Login successful");
       
        

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

 


  const reloadPage = () => {
   
  };
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };







useEffect(() => {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
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

        <span className="letter">B</span>udget <span className="letter">B</span>uddy</h1>  

         <h1 className="headerLogoMobile">

        <span className="letter" onClick={reloadPage}>BB</span>
        
      </h1>   


    <SearchPage/>

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
            <h3  className={`modalText ${isDarkMode ? "dark" : "light"}`}>Login</h3>
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



                
                   <div type="button" className="lock" onClick={handlePasswordVisibility}>
                  {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} /> }
                </div>


            


              <button
                type="submit"
                className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
              >
                Login
              </button>
              <button
                className={`buttonCLose modalButtonLog ${isDarkMode ? "dark" : "light"}`}
                onClick={handleCloseLoginModal}
              >
                Close
              </button>
           
              <p  className={`modalText ${isDarkMode ? "dark" : "light"}`}> create a new account</p>
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

      

      {isModalOpen && (
        <div className="modal">
          <div
            className={`modalLog modalContent ${isDarkMode ? "dark" : "light"}`}
          >
           <h3  className={`modalText ${isDarkMode ? "dark" : "light"}`}>Registration</h3>
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
                   <div type="button" className="lock" onClick={handlePasswordVisibility}>
                  {showPassword ?<FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} /> }
                </div>


              </div>
              <button
                type="submit"
                className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
              >
                Register
              </button>
              <button
                className={`buttonCLose modalButtonLog ${isDarkMode ? "dark" : "light"}`}
                onClick={handleCloseModal} 
              >
                Close
              </button>
             
              <p  className={`modalText ${isDarkMode ? "dark" : "light"}`}> enter login</p>
              <button
                className={`modalButtonLog ${isDarkMode ? "dark" : "light"}`}
                onClick={handleOpenLoginModal}
              >
               Login   <FontAwesomeIcon icon={faArrowRightToBracket}/>
              </button>
             
            </form>
          </div>  

        </div>
      )}


    </div>
  );
};

export default Header;