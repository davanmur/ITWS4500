import React, { useState, useEffect } from "react";

export default function Last({ symbol, currency }) { // Destructure `currency` from props
  const [last, setLast] = useState(null); // State variable for last
  const [curr, setCurr] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts or when `currency` changes
    fetch(`${window.location.origin}/stock/${symbol}?c=${currency}`)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log("responseData:", JSON.stringify(responseData));
        setLast(responseData.last); // Update last price state
        setCurr(responseData[currency]); // Update current price state
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, [symbol, currency]); // Run effect when `symbol` or `currency` changes

  // console.log("curr:", curr);

  return (
    <div>
      <h1>Last Price</h1>
      <p className="price" id="last" data-last={last}>${last}</p>
      <p className="conversion">1.00 USD : {curr} {currency}</p>
    </div>
  );
}
