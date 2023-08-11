import React, { useState, useEffect, useRef } from "react";

import config from '../config';
import "./Dashboard.css"
import "./Converter.css";
import "./Style.css";



const Converter = ({ isDarkMode }) => {
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [conversionRates, setConversionRates] = useState({});

  const [sourceCurrency, setSourceCurrency] = useState("GBP");
  const [targetCurrency, setTargetCurrency] = useState("GEL");
  const currencies = ["EUR", "GBP", "GEL", "TRY", "RUB", "USD"];

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const updateConversionRates = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
                                    
      const response = await fetch(`${config.apiUrl}exchange` , {
        headers: headersWithToken,
      });

      if (!response.ok) {
        console.log("Error fetching conversion rates.");
        return;
      }

      const data = await response.json();
      const newConversionRates = data.quotes;
  
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
      const hoursElapsed = (Date.now() - parseInt(lastUpdateTimestamp)) / (1000 * 60 * 30);

      if (hoursElapsed < 1) {
        setConversionRates(parsedConversionRates);
      } else {
 
        updateConversionRates();
      }
    } else {
      updateConversionRates();
    }


    const intervalId = setInterval(updateConversionRates, 1000 * 60 * 30);


    return () => clearInterval(intervalId);
  }, []);

  



  const handleAmountChange1 = (e) => {
    const { value } = e.target;
    setAmount1(value);
    const convertedAmount = convertCurrency(value, sourceCurrency, targetCurrency);
    setAmount2(convertedAmount);
  };

  const handleAmountChange2 = (e) => {
    const { value } = e.target;
    setAmount2(value);
    const convertedAmount = convertCurrency(value, targetCurrency, sourceCurrency);
    setAmount1(convertedAmount);
  };

  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    const sourceRate = conversionRates[`USD${fromCurrency}`];
    const targetRate = conversionRates[`USD${toCurrency}`];
  
    if (sourceRate && targetRate) {
      const convertedAmount = (amount / sourceRate) * targetRate;
      return convertedAmount.toFixed(2);
    }
    return "";
  };
  
  

  const handleSourceCurrencyChange = (e) => {
    const { value } = e.target;
    setSourceCurrency(value);
    const convertedAmount = convertCurrency(amount1, value, targetCurrency);
    setAmount2(convertedAmount);
  };

  const handleTargetCurrencyChange = (e) => {
    const { value } = e.target;
    setTargetCurrency(value);
    const convertedAmount = convertCurrency(amount2, value, sourceCurrency);
    setAmount1(convertedAmount);
  };

  const handleCloseConverterForm = () => {
    setAmount1("");
    setAmount2("");
    if (inputRef1.current) {
      inputRef1.current.focus();
    }
     updateConversionRates();

  };




  
  return (
    <div className={`mainField ${isDarkMode ? "dark" : "light"}`}>

    <div className={`secondt converter ${isDarkMode ? "dark" : "light"}`}>
      <h3 className="headerCurrency">converter</h3>
      <>
        <div className="input-container">
          <input
            ref={inputRef1}
            type="text"
            value={amount1}
            onChange={handleAmountChange1}
            placeholder={`enter amount in ${sourceCurrency}`}
          />
          <select
            onChange={handleSourceCurrencyChange}
            value={sourceCurrency}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
      
        </div>
       
      
      </>
      <>
        <br/>
        <div className="input-container">
          
          <input
            ref={inputRef2}
            type="text"
            value={amount2}
            onChange={handleAmountChange2}
            placeholder={`enter amount in ${targetCurrency}`}
          />
           <select
            onChange={handleTargetCurrencyChange}
            value={targetCurrency}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      <br/>
        
        <button className="modalBtn cross" onClick={handleCloseConverterForm}>
          clear
        </button>
      </>
    </div>    </div>
  );
};

export default Converter;