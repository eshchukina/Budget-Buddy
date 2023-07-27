import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// import config from './config';

import "./Converter.css";

const Converter = ({ isDarkMode }) => {
  const [amount, setAmount] = useState("");
  const [conversionRates, setConversionRates] = useState({});
  const [showConverterForm, setShowConverterForm] = useState(false); 
  const [selectedCurrency, setSelectedCurrency] = useState("EUR"); 
  const currencies = ["EUR", "GBP", "GEL", "TRY", "RUB"]; 


  const updateConversionRates = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
                                   // fetch(`${config.apiUrl}endpoint`)
      const response = await fetch("http://192.168.1.30:1323/exchange", {
        headers: headersWithToken,
      });

      if (!response.ok) {
        console.log("Error fetching conversion rates.");
        return;
      }

      const data = await response.json();
      const newConversionRates = data.quotes;
      console.log(newConversionRates);

      if (Object.values(newConversionRates).some(rate => rate !== 0)) {
        localStorage.setItem("conversionRates", JSON.stringify(newConversionRates));
        localStorage.setItem("lastUpdateTimestamp", Date.now());
        setConversionRates(newConversionRates);
      } else {
        console.log("Received zero conversion rates. Using the existing data.");
      }
    } catch (error) {
      console.log("Error fetching conversion rates:", error);
    }
  };

  useEffect(() => {

    const storedConversionRates = localStorage.getItem("conversionRates");
    const lastUpdateTimestamp = localStorage.getItem("lastUpdateTimestamp");

    if (storedConversionRates && lastUpdateTimestamp) {
      const parsedConversionRates = JSON.parse(storedConversionRates);
      const hoursElapsed = (Date.now() - parseInt(lastUpdateTimestamp)) / (1000 * 60 * 60);

      if (hoursElapsed < 1) {
        setConversionRates(parsedConversionRates);
      } else {
 
        updateConversionRates();
      }
    } else {
      updateConversionRates();
    }


    const intervalId = setInterval(updateConversionRates, 1000 *60 * 60);


    return () => clearInterval(intervalId);
  }, []);

  

  const handleAmountChange = (e) => {
    const { value } = e.target;
    setAmount(value);
  };

  const handleCurrencyChange = (e) => {
    const { value } = e.target;
    setSelectedCurrency(value); // Include the "USD" prefix when updating selectedCurrency
  };

  const convertCurrency = () => {
    const rate = conversionRates[`USD${selectedCurrency}`]; // Use the correct key with the "USD" prefix
    if (rate) {
      return (amount * rate).toFixed(2);
    }
    return "N/A";
  };



  const handleOpenConverterForm = () => {
    setShowConverterForm(true);
  };


  const handleCloseConverterForm = () => {
    setShowConverterForm(false);  
    setAmount("");
    setSelectedCurrency("EUR");
  };


return (
    <div className={`converter ${isDarkMode ? "dark" : "light"}`}>
      <h3 className="headerCurrency">Converter USD</h3>
      {!showConverterForm && (
        <>
          <button className="buttonArrow" onClick={handleOpenConverterForm}>
          <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <button className="buttonCoins" onClick={handleOpenConverterForm}>
            <FontAwesomeIcon icon={faCoins} />
          </button>
        </>
      )}

      {showConverterForm && (
        <>     <h3 className="headerCurrencyAdd"> Converter USD</h3>
          <div className="input-container">
        
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount in USD"

              
            />
            <select onChange={handleCurrencyChange} value={selectedCurrency}>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="result">
            {amount !== "" ? (
              <>
                <p>
                  {amount} USD to {convertCurrency()} {selectedCurrency}
                </p>
              </>
            ) : (
              <p>currency conversion: </p>
            )}
          </div>
          <button className="modalBtn cross" onClick={handleCloseConverterForm}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </>
      )}
    </div>
  );
};
export default Converter;
