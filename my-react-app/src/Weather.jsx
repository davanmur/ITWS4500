import React, { useState } from "react";
import GroupedBarChart from "./GroupedBarChart";
import WeatherBarGraph from "./WeatherBarGraph";

export default function Weather() {
  const [lat, setLat] = useState('0');
  const [lon, setLon] = useState('0');

  const handleCordSubmit = (event) => {
    event.preventDefault();
    const lat = document.getElementById("lat").value; 
    setLat(lat);
    const lon = document.getElementById("lon").value; 
    setLon(lon);
    console.log("lat:", lat, " lon:", lon);
  };

  const handleCitySubmit = (event) => {
    event.preventDefault();
    let location = document.getElementById("loc").value;
    fetch(`${window.location.href}location/${location}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data:", JSON.stringify(data));
      setLat(data[0].lat);
      setLon(data[0].lon);
      console.log("lat:", lat, " lon:", lon);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  };

  const handleOpen = () => {
    console.log("/external/open");

    fetch(`${window.location.href}external/open?lat=${lat}&lon=${lon}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("weather_out").innerHTML = 
      `<div id="weather-left">
        <h1 id="location">${data.city}, ${data.country}</h1>
        <h1 id="temp">${data.temp}°F</h1>
        <p class="feels-like">Feels like:</p>
        <h2 class="feels-like">${data.feels_like}°F</h2>
      </div>
      <div id="weather-right">
        <p id="humid">Humidity: ${data.humidity}%</p>
        <p id="percip">Wind Speed: ${data.wind_speed}</p>
        <p id="descrp">${data.desc}</p>
      </div>`; 
      document.getElementById("code_out").innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
      // console.log("data:", JSON.stringify(data));
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });

  };

  const handleForeca = () => {
    console.log("/external/foreca");

    fetch(`${window.location.href}external/foreca?lat=${lat}&lon=${lon}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("weather_out").innerHTML = 
      `<div id="weather-left">
        <h1 id="location">${data.city}, ${data.country}</h1>
        <h1 id="temp">${data.temp}°F</h1>
        <p class="feels-like">Feels like:</p>
        <h2 class="feels-like">${data.feels_like}°F</h2>
      </div>
      <div id="weather-right">
        <p id="humid">Humidity: ${data.humidity}%</p>
        <p id="percip">Wind Speed: ${data.wind_speed}</p>
        <p id="descrp">${data.desc}</p>
      </div>`; 
      document.getElementById("code_out").innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
      // console.log("data:", JSON.stringify(data));
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });

  };

  const handleBit = () => {
    console.log("/external/bit");

    fetch(`${window.location.href}external/bit?lat=${lat}&lon=${lon}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("weather_out").innerHTML = 
      `<div id="weather-left">
        <h1 id="location">${data.city}, ${data.country}</h1>
        <h1 id="temp">${data.temp}°F</h1>
        <p class="feels-like">Feels like:</p>
        <h2 class="feels-like">${data.feels_like}°F</h2>
      </div>
      <div id="weather-right">
        <p id="humid">Humidity: ${data.humidity}%</p>
        <p id="percip">Wind Speed: ${data.wind_speed}</p>
        <p id="descrp">${data.desc}</p>
      </div>`; 
      document.getElementById("code_out").innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
      // console.log("data:", JSON.stringify(data));
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });

  };

  //From MongoDB
  const [selectedNum, setSelectedNum] = useState(''); 

  const handleNumberSubmit = (event) => {
    event.preventDefault();
    const selectedNum = document.getElementById("number").value; 
    setSelectedNum(selectedNum);
    console.log("selectedNum:", selectedNum);
  };
  
  const handleGETClick = () => {

    if(selectedNum === '') {
      console.log("/weather_db");

      fetch(`${window.location.href}weather_db`)
      .then((response) => response.json())
      .then((responseData) => {
        document.getElementById("mongo_out").innerHTML = `<pre>${JSON.stringify(responseData, null, 2)}</pre>`; 
        // console.log("responseData:", JSON.stringify(responseData));
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    } else {
      console.log(`/weather_db/${selectedNum}`);

      fetch(`${window.location.href}weather_db/${selectedNum}`)
      .then((response) => response.json())
      .then((responseData) => {
        document.getElementById("mongo_out").innerHTML = `<pre>${JSON.stringify(responseData, null, 2)}</pre>`; 
        // console.log("responseData:", JSON.stringify(responseData));
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    }

  };

  const handlePOSTClick = () => {

    if(selectedNum === '') {
      console.log("body:", document.getElementById("content").value);

      fetch(`${window.location.href}weather_db`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: document.getElementById("content").value
      })
      .then((response) => response.text())
      .then((responseData) => {
        document.getElementById("mongo_out").innerHTML = "<p>" + responseData + "</p>"; 
        // console.log("responseData:", responseData);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
      
    } else {
      console.log(`/weather_db/${selectedNum}`);

      document.getElementById("mongo_out").innerHTML = "<p>No endpoint.</p>";
    }

  };

  const handlePUTClick = () => {

    if(selectedNum === '') {
      console.log("/weather_db");

      fetch(`${window.location.href}weather_db`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: document.getElementById("content").value
      })
      .then((response) => response.text())
      .then((responseData) => {
        document.getElementById("mongo_out").innerHTML = "<p>" + responseData + "</p>"; 
        // console.log("responseData:", responseData);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

      
    } else {
      console.log(`/weather_db/${selectedNum}`);

      fetch(`${window.location.href}weather_db/${selectedNum}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: document.getElementById("content").value
      })
      .then((response) => response.text())
      .then((responseData) => {
        document.getElementById("mongo_out").innerHTML = "<p>" + responseData + "</p>"; 
        // console.log("responseData:", responseData);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
      
    }

  };

  const handleDELETEClick = (event) => {
    event.preventDefault();

    if(selectedNum === '') {
      // console.log("/weather_db");

      fetch(`${window.location.href}weather_db`, {
        method: 'DELETE'
      })
      .then((response) => response.text())
      .then((responseData) => {
        document.getElementById("mongo_out").innerHTML = "<p>" + responseData + "</p>"; 
        // console.log("responseData:", responseData);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

    } else {
      // console.log(`/weather_db/${selectedNum}`);

      fetch(`${window.location.href}weather_db/${selectedNum}`, {
        method: 'DELETE'
      })
      .then((response) => response.text())
      .then((responseData) => {
        document.getElementById("mongo_out").innerHTML = "<p>" + responseData + "</p>"; 
        // console.log("responseData:", responseData);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

    }

  };

  const [source, setSource] = useState('OpenWeatherAPI');

  const handleSourceSubmit = (event) => {
    event.preventDefault();
    const newSource = event.target.source.value;
    setSource(newSource);
  };

  return (
    <div>

      <h2 class="top-h2">Current Weather</h2>
      <div class="dropdown">
        <form id="locationForm" onSubmit={handleCitySubmit}>
          <label for="loc">Location:</label>
          <input name="loc" id="loc"></input>
          <input type="submit" class="submit" value="Submit" />
        </form>
        <form id="weatherForm" onSubmit={handleCordSubmit}>
          <label for="lat">Latitude:</label>
          <input name="lat" id="lat"></input>
          <br></br>
          <label for="lon">Longitude:</label>
          <input name="lon" id="lon"></input>
          <input type="submit" class="submit" value="Submit" />
        </form>
      </div>

      <div class="buttons">
        <button onClick={handleOpen}>OpenWeatherAPI</button>
        <button onClick={handleForeca}>Foreca</button>
        <button onClick={handleBit}>Weatherbit</button>
      </div>
      
      <p id="note">
        Note: each API interprets the cordinates slightly differently, so they might return a different town name than was inputed.
        At least one of them should return the correct one though! (And all the data should be essentially the same anyway!)
      </p>
      <div id="weather_out">
        
      </div>
      <div id="code_out">
        
      </div>

      <h2>Saved Weather</h2>
      <div class="dropdown">
        <form id="weatherForm" onSubmit={handleNumberSubmit}>
          <label for="number">Document number:</label>
          <input name="number" id="number"></input>
          <br></br>
          <label for="content">Body:</label>
          <textarea id="content" name="content"></textarea>
          <input type="submit" class="submit" value="Submit" />
        </form>
      </div>

      <div id="buttons" class="buttons">
        <button onClick={handleGETClick}>GET</button>
        <button onClick={handlePOSTClick}>POST</button>
        <button onClick={handlePUTClick}>PUT</button>
        <button onClick={handleDELETEClick}>DELETE</button>
      </div>

      <div id="mongo_out">

      </div>

      <h2 class="top-h2">Graphics</h2>

      <div class="dropdown">
        <form id="sourceForm" onSubmit={handleSourceSubmit}>
          <label for="source">Source:</label>
          <select name="source" id="source">
            <option value="OpenWeatherAPI">OpenWeatherAPI</option>
            <option value="Foreca">Foreca</option>
            <option value="Weatherbit">Weatherbit</option>
          </select>
          <input type="submit" class="submit" value="Submit" />
        </form>
      </div>
      
      <WeatherBarGraph source={source}></WeatherBarGraph>

      <GroupedBarChart source={source}></GroupedBarChart>
    </div>
  );
}