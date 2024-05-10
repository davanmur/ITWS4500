import React, { useState, useEffect } from "react";

export default function Mid({ symbol, currency }) { // Destructure `currency` from props
  const [mid, setMid] = useState(null); // State variable for mid
  const [curr, setCurr] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts or when `currency` changes
    fetch(`${window.location.origin}/mid/${symbol}?c=${currency}`)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log("responseData:", JSON.stringify(responseData));
        setMid(responseData.mid); // Update mid price state
        setCurr(responseData[currency]); // Update current price state
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, [symbol, currency]); // Run effect when `symbol` or `currency` changes

  return (
    <div id="mid">
      <h1>Mid Price</h1>
      <p className="price" data-mid={mid}>${mid}</p>
      <p className="conversion">1.00 USD : {curr} {currency}</p>
    </div>
  );
}
