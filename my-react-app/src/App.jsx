import React, { useState } from "react";
import Stocks from "./Stocks";
import Weather from "./Weather";
import News from "./News";

export default function App() {
  const [selectedTab, setSelectedTab] = useState("Weather"); // Default to showing Stocks

  const showWeather = () => {
    setSelectedTab("Weather");
  };

  const showNews = () => {
    setSelectedTab("News");
  };

  const showStocks = () => {
    setSelectedTab("Stocks");
  };

  return (
    <div>

      <header>
        <h1 class="top-h2">First Stop</h1>
        <button onClick={showWeather} className={selectedTab === "Weather" ? "active" : ""}>Weather</button>
        <button onClick={showNews} className={selectedTab === "News" ? "active" : ""}>News</button>
        <button onClick={showStocks} className={selectedTab === "Stocks" ? "active" : ""}>Stocks</button>
      </header>

      {selectedTab === "Weather" && <Weather />}
      {selectedTab === "News" && <News />}
      {selectedTab === "Stocks" && <Stocks />}
      
    </div>
  );
}