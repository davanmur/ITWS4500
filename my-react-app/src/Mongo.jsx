import React, { useState } from "react";

export default function Mongo() {

  const [selectedNum, setSelectedNum] = useState(''); 

  const handleNumberSubmit = (event) => {
    event.preventDefault();
    const selectedNum = document.getElementById("number").value; 
    setSelectedNum(selectedNum);
    console.log("selectedNum:", selectedNum);
  };
  
  const handleGETClick = () => {

    if(selectedNum === '') {
      console.log("/db");

      fetch(`${window.location.href}db`)
      .then((response) => response.json())
      .then((responseData) => {
        document.getElementById("mongo_out").innerHTML = `<pre>${JSON.stringify(responseData, null, 2)}</pre>`; 
        // console.log("responseData:", JSON.stringify(responseData));
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    } else {
      console.log(`/db/${selectedNum}`);

      fetch(`${window.location.href}db/${selectedNum}`)
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

      fetch(`${window.location.href}db`, {
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
      console.log(`/db/${selectedNum}`);

      document.getElementById("mongo_out").innerHTML = "<p>No endpoint.</p>";
    }

  };

  const handlePUTClick = () => {

    if(selectedNum === '') {
      console.log("/db");

      fetch(`${window.location.href}db`, {
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
      console.log(`/db/${selectedNum}`);

      fetch(`${window.location.href}db/${selectedNum}`, {
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
      // console.log("/db");

      fetch(`${window.location.href}db`, {
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
      // console.log(`/db/${selectedNum}`);

      fetch(`${window.location.href}db/${selectedNum}`, {
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

  return (
    <div>
      <h2>Saved Stocks</h2>

      <div class="dropdown">
        <form id="mongoForm" onSubmit={handleNumberSubmit}>
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
    </div>
  );
}