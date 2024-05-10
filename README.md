# README

## Final Project

This is the complete version of the personal project developed in Web Science Systems. It is meant to be 
a website which gathers and displays all pertinent information a person might want to see when they first wake up
as well as meeting the various specified requirements for the assignment (such as displaying the graphics).

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
