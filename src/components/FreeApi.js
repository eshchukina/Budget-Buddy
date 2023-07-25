import React, { useState, useEffect } from 'react';

const FreeApi = () => {
  const [conversionResult, setConversionResult] = useState(null);

  useEffect(() => {
    const fetchConversionData = async () => {
      const url = 'https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=AUD&to=CAD&amount=1';

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '150783bd6dmshae2b25ad24c4b1fp1cb3ddjsn4ca8b66fcb07',
          'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        setConversionResult(result);
      } catch (error) {
        console.error('Error fetching conversion data:', error);
      }
    };

    fetchConversionData();
  }, []);

  return (
    <div>
      <h2>Currency Conversion Result</h2>
      {conversionResult && <p>{conversionResult}</p>}
    </div>
  );
};

export default FreeApi;
