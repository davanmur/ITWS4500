import React from "react";

export default function Save() {

  const handleClick = () => {

    window.open(`${window.location.origin}/stocks`, '_blank');

  };

  return (
    <button id="history" onClick={handleClick}>History</button>
  );
}