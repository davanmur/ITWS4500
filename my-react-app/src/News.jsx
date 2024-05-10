import React, { useState } from "react";

export default function Weather() {

  fetch(`${window.location.href}news`)
  .then(response => response.json())
  .then(responseData => {
    let output = '';
    responseData.articles.forEach(obj => {
      output += "<a href='" + obj.url + "' target='_blank'>" + obj.title + "</a>";
    });
    
    const newsElements = document.getElementsByClassName('news');

    Array.from(newsElements).forEach(element => {
      element.innerHTML = output;
    });
    
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

  const handleSearch = (event) => {
    event.preventDefault();

    fetch(`${window.location.href}news?q=${document.getElementById("search").value}`)
      .then(response => response.json())
      .then(responseData => {
        let output = '';
        responseData.articles.forEach(obj => {
          output += `<p> <a href='${obj.url}' target='_blank'>${obj.title}</a> </p>`;
          console.log(`<p> <a href='${obj.url}' target='_blank'>${obj.title}</a> </p>`);
        });
        
        document.getElementById("news_out").innerHTML = output;
        
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  return (
    <div>
      <h2 id="top-h2">Top News In US</h2>
      <div class="ticker">
        <div class="news">
        </div>
      </div>

      <h2>Search for news around the world</h2>
      <form class="dropdown" onSubmit={handleSearch}>
        <input type="text" placeholder="Search.." name="search" id="search"></input>
        <button type="submit" class="submit">Search</button>
      </form>

      <div id="news_out">

      </div>
    </div>
  );
}