import React from "react";

export default function Save({ symbol, ask, last, mid, curr, conv }) {
  
  const handleClick = () => {

    const jsonData = `{"ask": "${ask}", "last": "${last}", "mid": "${mid}", "${curr}": "${conv}"}`;
    // console.log(jsonData);

    fetch(`${window.location.href}stocks/${symbol}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
    .then(response => {
      if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
    })

  };

  
  return (
    <button id="save" onClick={handleClick}>Save</button>
  );
}