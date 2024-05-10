const express = require('express');
const fs = require('fs').promises;
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

app.use(express.static('my-react-app/build'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { MongoClient } = require('mongodb');

///////////////////////////////////
//-----------LOCATION------------//
///////////////////////////////////

app.get('/location/:loc', async (req, res) => {
  const loc = req.params.loc;

  const apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=83102ff7300b669027d51a6068772c9b`;
  // const apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=5&appid=83102ff7300b669027d51a6068772c9b`;

  fetch(apiURL)
  .then((response) => {
    if (!response.ok) {
      res.status(500);
      res.json({ 'message': 'I was not able to fetch that location' });
    } else {
      return response.json();
    }
  })
  .then((data) => {

    res.send(data);
  })
});

///////////////////////////////////
//------------WEATHER------------//
///////////////////////////////////

var weather_id = 301;

// External GETs
// Troy, NY: 42.728104,-73.687576
app.get('/external/open', async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  try {
    // Fetch weather data from OpenWeatherMap API
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=83102ff7300b669027d51a6068772c9b`;
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Construct the final weather object
    const final = { 
      id: weather_id,
      source: "OpenWeatherAPI", 
      lat: lat, 
      lon: lon, 
      city: data.name, 
      country: data.sys.country,
      temp: data.main.temp, 
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      desc: data.weather[0].description
    };

    weather_id++;

    res.json(final);

    // Connect to the MongoDB cluster
    await weather_client.connect();
    const result = await weather_client.db("lab06").collection("weather").insertOne(final);

  } catch (error) {
    console.error('There was a problem with your location fetch operation:', error);
    res.status(500).send("Error fetching weather data");
  }
});

app.get('/external/foreca', async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  try {
    // Fetch location data from Foreca API
    const locationResponse = await fetch(`https://pfa.foreca.com/api/v1/location/${lon},${lat}?lang=en&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZmEuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTcxMTkyNDU1NiwiZXhwIjo5OTk5OTk5OTk5LCJuYmYiOjE3MTE5MjQ1NTYsImp0aSI6IjNkNDExYWNkNWFhMzBiZjciLCJzdWIiOiJkYXZhbm0wNCIsImZtdCI6IlhEY09oakM0MCtBTGpsWVR0amJPaUE9PSJ9.aOey7eMqlWjICTUIaAF4pvUJv8k7IiCRUsAadbo4qIo`);
    if (!locationResponse.ok) {
      throw new Error('Location fetch failed');
    }
    const locationData = await locationResponse.json();

    // Fetch weather data from Foreca API
    const weatherResponse = await fetch(`https://pfa.foreca.com/api/v1/current/${lon},${lat}?lang=en&tempunit=F&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZmEuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTcxMTkyNDU1NiwiZXhwIjo5OTk5OTk5OTk5LCJuYmYiOjE3MTE5MjQ1NTYsImp0aSI6IjNkNDExYWNkNWFhMzBiZjciLCJzdWIiOiJkYXZhbm0wNCIsImZtdCI6IlhEY09oakM0MCtBTGpsWVR0amJPaUE9PSJ9.aOey7eMqlWjICTUIaAF4pvUJv8k7IiCRUsAadbo4qIo`);
    if (!weatherResponse.ok) {
      throw new Error('Weather fetch failed');
    }
    const weatherData = await weatherResponse.json();

    const final = {
      id: weather_id,
      source: "Foreca",
      lat: lat,
      lon: lon,
      city: locationData.name,
      country: locationData.country,
      temp: weatherData.current.temperature,
      feels_like: weatherData.current.feelsLikeTemp,
      humidity: weatherData.current.relHumidity,
      wind_speed: weatherData.current.windSpeed,
      desc: weatherData.current.symbolPhrase
    };

    // Increment the weather_id for the next entry
    weather_id++;

    // Send the response
    res.json(final);

    // Connect to the MongoDB cluster
    await weather_client.connect();
    const result = await weather_client.db("lab06").collection("weather").insertOne(final);

    // // Read  weather data from file
    // const existingWeatherData = await fs.readFile(__dirname + '/my-react-app/weather.json', 'utf-8');
    // const weather = JSON.parse(existingWeatherData);

    // // Add new data to the existing weather object
    // weather.push(final);

    // // Write updated weather data back to the file
    // await fs.writeFile(__dirname + '/my-react-app/weather.json', JSON.stringify(weather, null, 2));
    
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    res.status(500).send("Error fetching weather data");
  }
});

app.get('/external/bit', async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  try {
    // Fetch weather data from OpenWeatherMap API
    const apiURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&units=I&key=f62f76d33ebf412584ee3e9c327748ec`;
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Construct the final weather object
    const final = { 
      id: weather_id,
      source: "Weatherbit", 
      lat: lat, 
      lon: lon, 
      city: data.data[0].city_name, 
      country: data.data[0].country_code,
      temp: data.data[0].temp, 
      feels_like: data.data[0].app_temp,
      humidity: data.data[0].rh,
      wind_speed: data.data[0].wind_spd,
      desc: data.data[0].weather.description
    };

    weather_id++;

    res.json(final);

    // Connect to the MongoDB cluster
    await weather_client.connect();
    const result = await weather_client.db("lab06").collection("weather").insertOne(final);

    // // Read weather data from file
    // const weatherData = await fs.readFile(__dirname + '/my-react-app/weather.json', 'utf-8');
    // const weather = JSON.parse(weatherData);
    
    // // Add new data to the existing weather object
    // weather.push(final);

    // // Write updated weather data back to the file
    // await fs.writeFile(__dirname + '/my-react-app/weather.json', JSON.stringify(weather, null, 2));
    
  } catch (error) {
    console.error('There was a problem with your location fetch operation:', error);
    res.status(500).send("Error fetching weather data");
  }
  
})

const weather_uri = `mongodb+srv://${process.env.MONGODB}/lab06`;
const weather_client = new MongoClient(weather_uri);

app.get('/weather_db', async (req, res) => {
  try {
    // Connect to the MongoDB cluster
    await weather_client.connect();
    const result = await weather_client.db("lab06").collection("weather").find();

    let nums = [];
    // Iterate through the results and add the key values to the 'nums' array
    await result.forEach(doc => {
      nums.push(doc.id);
    });

    // Send the array as a JSON response
    res.json(nums);

  } catch (e) {
      console.error(e);
  } finally {
      await weather_client.close();
  }
})

app.get('/weather_db/:id', async (req, res) => {
  const _id = parseInt(req.params.id, 10);
  try {
    // Connect to the MongoDB cluster
    await weather_client.connect();
    const result = await weather_client.db("lab06").collection("weather").findOne({ id: _id });

    // console.log("result:", result);
    if (result == null) {
      res.send({});
    } else {
      res.send(result);
    }
    

  } catch (e) {
      console.error(e);
  } finally {
      await weather_client.close();
  }
})

app.post('/weather_db', async (req, res) => {
  try {
    // Connect to the MongoDB cluster
    await weather_client.connect();
    const result = await weather_client.db("lab06").collection("weather").insertOne(req.body);

    // console.log(req.body);

    res.send("Added successfully.");

  } catch (e) {
      console.error(e);
  } finally {
      await weather_client.close();
  }
})

app.put('/weather_db', async (req, res) => {
  try {
    // Connect to the MongoDB cluster
    await weather_client.connect();
    const result = await weather_client.db("lab06").collection("weather").updateMany({ id: { $exists: true } }, { $set: req.body });

    // console.log(req.body);

    res.send(`All modified successfully.`);

  } catch (e) {
      console.error(e);
  } finally {
      await weather_client.close();
  }
})

app.put('/weather_db/:id', async (req, res) => {
  const _id = parseInt(req.params.id, 10);
  try {
    // Connect to the MongoDB cluster
    await weather_client.connect();
    const result = await weather_client.db("lab06").collection("weather").updateOne({ id: _id }, { $set: req.body});

    // console.log(req.body);

    res.send(`Key ${_id} modified successfully.`);

  } catch (e) {
      console.error(e);
  } finally {
      await weather_client.close();
  }
})

app.delete('/weather_db', async (req, res) => {
  try {
    // Connect to the MongoDB cluster
    await weather_client.connect();
    const result = await weather_client.db("lab06").collection("weather").deleteMany();

    res.send(`All deleted successfully.`);

  } catch (e) {
      console.error(e);
  } finally {
      await weather_client.close();
  }
})

app.delete('/weather_db/:id', async (req, res) => {
  const _id = parseInt(req.params.id, 10);
  try {
    // Connect to the MongoDB cluster
    await weather_client.connect();
    const result = await weather_client.db("lab06").collection("weather").deleteOne({ id: _id });

    res.send(`Key ${_id} deleted successfully.`);

  } catch (e) {
      console.error(e);
  } finally {
      await weather_client.close();
  }
})

app.get('/groupedbarchart/:source', async (req, res) => {
  const _source = req.params.source;
  try {
    // Connect to the MongoDB cluster
    await weather_client.connect();
    const result = await weather_client.db("lab06").collection("weather").find({ source : _source }).toArray();

    let data = [];
    // Iterate through the results and add the key values to the 'data' array
    await result.forEach(doc => {
      data.push({ city: doc.city, temp: doc.temp, feels_like: doc.feels_like });
    });
    // Send the array as a JSON response
    res.json(data);

  } catch (e) {
      console.error(e);
  }
})

app.get('/weatherbarchart/:source', async (req, res) => {
  const _source = req.params.source;
  try {
    // Connect to the MongoDB cluster
    await weather_client.connect();
    const result = await weather_client.db("lab06").collection("weather").find({ source: _source }).toArray();

    let descriptionCounts = {};
    // Iterate through the results and count each description
    result.forEach(doc => {
      if (doc.desc in descriptionCounts) {
        descriptionCounts[doc.desc]++;
      } else {
        descriptionCounts[doc.desc] = 1;
      }
    });

    // Convert the counts object into the desired array format
    let data = Object.keys(descriptionCounts).map(description => ({
      description: description,
      count: descriptionCounts[description]
    }));

    // Send the array as a JSON response
    res.json(data);

  } catch (e) {
      console.error(e);
  }
})

///////////////////////////////////
//-------------NEWS--------------//
///////////////////////////////////

app.get('/news', (req, res) => {
  let newsAPI;
  if(req.query.q != null) { newsAPI = `https://newsapi.org/v2/everything?q=${req.query.q}&apiKey=3db5ead3b2764915b8b54da4160aab2d`; }
    
  else { newsAPI = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=3db5ead3b2764915b8b54da4160aab2d'; }
    
  fetch(newsAPI)
  .then((response) => {
    if (!response.ok) {
      res.status(500);
      res.json({ 'message': 'I was not able to fetch that news' });
    } else {
      return response.json();
    }
  })
  .then((data) => {
    // data.articles.forEach(obj => {
    //   news.push(obj.title);
    // })
    res.send(data);
  })

});

///////////////////////////////////
//------------STOCKS-------------//
///////////////////////////////////

// /stock/AAPL?c=EUR
app.get('/stock/:id', (req, res) => {
  var stockJSON;

  var stockURL = 'https://api.marketdata.app/v1/stocks/quotes/' + req.params.id + '/?token=RUZObzZxTDgtUGxKWjd0WnM4SHhtTGx1RE5JTHI0OGxneElCT1l5UmIxST0';
  var moneyURL = 'https://api.frankfurter.app/latest?from=USD';

  fetch(stockURL)
  .then((stockResp) => {
    if (!stockResp.ok) {
      res.status(500);
      res.json({ 'message': 'I was not able to fetch that stock :(' });
    } else {
      return stockResp.json();
    }
  })
  .then((stockData) => {
    stockJSON = stockData;
    fetch(moneyURL)
    .then((moneyResp) => {
      if (!moneyResp.ok) {
        res.status(500);
        res.json({ 'message': 'I was not able to fetch the conversions :(' });
      } else {
        return moneyResp.json();
      }
    })
    .then((moneyJSON) => {
      var last = { "last": `${stockJSON.last}`};
      if(req.query.c != null) {
        var curr = { [req.query.c]: `${moneyJSON.rates[req.query.c]}`};
        res.json(Object.assign(last, curr));
      } else {
        res.json(Object.assign(last, moneyJSON));
      }
    });
  });
});

app.get('/mid/:id', (req, res) => {
  var stockJSON;

  var stockURL = 'https://api.marketdata.app/v1/stocks/quotes/' + req.params.id + '/?token=RUZObzZxTDgtUGxKWjd0WnM4SHhtTGx1RE5JTHI0OGxneElCT1l5UmIxST0';
  var moneyURL = 'https://api.frankfurter.app/latest?from=USD';

  fetch(stockURL)
  .then((stockResp) => {
    if (!stockResp.ok) {
      res.status(500);
      res.json({ 'message': 'I was not able to fetch that stock :(' });
    } else {
      return stockResp.json();
    }
  })
  .then((stockData) => {
    stockJSON = stockData;
    fetch(moneyURL)
    .then((moneyResp) => {
      if (!moneyResp.ok) {
        res.status(500);
        res.json({ 'message': 'I was not able to fetch the conversions :(' });
      } else {
        return moneyResp.json();
      }
    })
    .then((moneyJSON) => {
      var mid = { "mid": `${stockJSON.mid}`};
      if(req.query.c != null) {
        var curr = { [req.query.c]: `${moneyJSON.rates[req.query.c]}`};
        res.json(Object.assign(mid, curr));
      } else {
        res.json(Object.assign(mid, moneyJSON));
      }
    });
  });
});

app.get('/ask/:id', (req, res) => {
  var stockJSON;

  var stockURL = 'https://api.marketdata.app/v1/stocks/quotes/' + req.params.id + '/?token=RUZObzZxTDgtUGxKWjd0WnM4SHhtTGx1RE5JTHI0OGxneElCT1l5UmIxST0';
  var moneyURL = 'https://api.frankfurter.app/latest?from=USD';

  fetch(stockURL)
  .then((stockResp) => {
    if (!stockResp.ok) {
      res.status(500);
      res.json({ 'message': 'I was not able to fetch that stock :(' });
    } else {
      return stockResp.json();
    }
  })
  .then((stockData) => {
    stockJSON = stockData;
    fetch(moneyURL)
    .then((moneyResp) => {
      if (!moneyResp.ok) {
        res.status(500);
        res.json({ 'message': 'I was not able to fetch the conversions :(' });
      } else {
        return moneyResp.json();
      }
    })
    .then((moneyJSON) => {
      var ask = { "ask": `${stockJSON.ask}`};
      if(req.query.c != null) {
        var curr = { [req.query.c]: `${moneyJSON.rates[req.query.c]}`};
        res.json(Object.assign(ask, curr));
      } else {
        res.json(Object.assign(ask, moneyJSON));
      }
    });
  });
});

app.post('/stocks/:id', bodyParser.json(), async (req, res) => {
  const id = req.params.id;
  try {
    var stocksData = "{}";

    // try to read File
    try {
      stocksData = await fs.readFile(__dirname + '/my-react-app/stocks.json', 'utf-8');
    } catch {
      // if file isn't found, create file
      fs.writeFile(__dirname + '/my-react-app/stocks.json', '{}', (err) => {
        if (err) {
          console.error('Error creating file:', err);
          return;
        }
        console.log('File created successfully');
      });
    }

    let stocks = JSON.parse(stocksData);
    // console.log("stocks:", stocks);
    
    // Defining new data to be added from body
    stocks[id] = req.body;
      
    // Writing to our JSON file 
    var newData = JSON.stringify(stocks, null, 2); 
    fs.writeFile(__dirname + '/my-react-app/stocks.json', newData, (err) => { 
      // Error checking 
      if (err) throw err; 
      console.log("Successfully wrote file"); 
    });
    res.send(stocks);  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/stocks/:id', bodyParser.json(), async (req, res) => {
  const id = req.params.id;
  let keys = Object.keys(req.body);
  try {
    const stocksData = await fs.readFile(__dirname + '/my-react-app/stocks.json', 'utf-8');

    let stocks = JSON.parse(stocksData);
    
    // Update items in stocks based on req.body
    for (const key of keys) {
      const value = req.body[key];

      if (stocks[id]) {
        stocks[id][key] = value;
      } else {
        res.send("Stock not found at this ID.");
        return; // Stop execution to prevent sending response multiple times
      }
    }

    // Writing to our JSON file 
    var newData = JSON.stringify(stocks, null, 2); 
    fs.writeFile(__dirname + '/my-react-app/stocks.json', newData, (err) => { 
      // Error checking 
      if (err) throw err; 
      console.log("Successfully wrote file"); 
    });
    res.send("PUT complete");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/stocks/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // read in json file
    const stocksData = await fs.readFile(__dirname + '/my-react-app/stocks.json', 'utf-8');
    const stocks = JSON.parse(stocksData);

    // if(stocks[id] == null)
    //   res.send("Stock not found at this number.");
    //   return;
    // else {
    //   delete stocks[id];
    // }

    if (stocks[id]) {
      delete stocks[id];
    } else {
      res.send("Stock not found at this ID.");
      return; // Stop execution to prevent sending response multiple times
    }
    
    // Writing to our JSON file 
    var newData = JSON.stringify(stocks, null, 2); 
    fs.writeFile(__dirname + '/my-react-app/stocks.json', newData, (err) => { 
      // Error checking 
      if (err) throw err; 
      console.log("Successfully wrote file"); 
    });
    res.send("DELETE complete");

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/stocks', async (req, res) => {
  try {
    const stocksData = await fs.readFile(__dirname + '/my-react-app/stocks.json', 'utf-8');
    const stocks = JSON.parse(stocksData);

    res.send(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

///////////////////////////////////
//------------MongoBD------------//
///////////////////////////////////

const uri = `mongodb+srv://${process.env.MONGODB}/lab05`;
const client = new MongoClient(uri);

const collection = "stocks";

app.get('/db', async (req, res) => {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client.db("lab05").collection(collection).find();

    let nums = [];
    // Iterate through the results and add the key values to the 'nums' array
    await result.forEach(doc => {
      nums.push(doc.key);
    });

    // Send the array as a JSON response
    res.json(nums);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
})

app.get('/db/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client.db("lab05").collection(collection).findOne({ key: id });

    // console.log(id);
    res.send(result);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
})

app.post('/db', async (req, res) => {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client.db("lab05").collection(collection).insertOne(req.body);

    // console.log(req.body);

    res.send("Added successfully.");

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
})

// res.body: { "id": "GOOGL" }
app.put('/db', async (req, res) => {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client.db("lab05").collection(collection).updateMany({ key: { $exists: true } }, { $set: req.body });

    // console.log(req.body);

    res.send(`All modified successfully.`);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
})

app.put('/db/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client.db("lab05").collection(collection).updateOne({ key: id }, { $set: req.body});

    // console.log(req.body);

    res.send(`Key ${id} modified successfully.`);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
})

app.delete('/db', async (req, res) => {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client.db("lab05").collection(collection).deleteMany();

    res.send(`All deleted successfully.`);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
})

app.delete('/db/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client.db("lab05").collection(collection).deleteOne({ key: id });

    res.send(`Key ${id} deleted successfully.`);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
})


app.listen(port, () => {
  console.log('Listening on *:3000');
});

