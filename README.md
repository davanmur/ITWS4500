# README

LAB 8: Final

======================================================
## Work Log

- removed code closing mongo connection from graphs to stop error 
  and allow them both to appear with no issues
- made a new News React component
  - copied over ticker code from lab 1
- located news API and made account
- created a new /news GET endpoint to retrieve article data
- combined code from lab 1 with endpoint to make news
  articles appear in the ticker
- reordered pages and renamed headings to make them more logical
- made new GET endpoint /location to pull from Geocoding API
- created a new location input on Weather.jsx and connected it the the
  GET endpoint the the frontend code to convert the name of a place into
  cordinates
- added HTML and CSS to better display weather data retieved from APIs (Web Systems lab03)
- integrated this second display with the call to server.js
- modify GET /news to include search query 'q'
- added search bar and display to React (w3schools: search button)

======================================================
## Sources

- lab01
- https://www.w3schools.com/jsref/met_document_getelementsbyclassname.asp
- https://www.w3schools.com/jsref/met_node_appendchild.asp
- ChatGPT
- Web Systems lab03
- https://www.w3schools.com/howto/howto_css_search_button.asp

======================================================
## APIs

Market Data: https://www.marketdata.app/docs/api/stocks/quotes  
Frankfurter: https://www.frankfurter.app/docs/

OpenWeatherAPI: https://home.openweathermap.org/
Foreca: https://developer.foreca.com/#Forecasts
Weatherbit: https://www.weatherbit.io/api/weather-current

News: https://newsapi.org/

======================================================
## React Setup Code

```
cd lab08/my-react-app/src
npm run build
cd ../..
node --env-file=.env server.js -OR- npm start
```

```
(in lab08)
sudo env "PATH=$PATH" npm i
sudo -u www-data nano .env (make .env file and copy in data)
```