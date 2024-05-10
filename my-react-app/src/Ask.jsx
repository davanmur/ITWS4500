import React, { useState, useEffect } from "react";

export default function Ask({ symbol, currency }) { // Destructure `currency` from props
  const [ask, setAsk] = useState(null); // State variable for ask
  const [curr, setCurr] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts or when `currency` changes
    fetch(`${window.location.origin}/ask/${symbol}?c=${currency}`)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log("responseData:", JSON.stringify(responseData));
        setAsk(responseData.ask); // Update ask price state
        setCurr(responseData[currency]); // Update current price state
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, [symbol, currency]); // Run effect when `symbol` or `currency` changes

  return (
    <div>
      <h1>Ask Price</h1>
      <p className="price"  id="ask" data-ask={ask}>${ask}</p>
      <p className="conversion" id="currency" data-conv={curr} data-curr={currency}>1.00 USD : {curr} {currency}</p>
    </div>
  );
}
