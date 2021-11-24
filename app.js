const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:


app.get("/", (req, res, next) => {
  let data = {
    name: "Ironhacker",
    bootcamp: "Ironhack Web Dev"
  };
 
  res.render("index", data);
});



app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
      let data = {
        beers: beersFromApi,
      }
      res.render('beers', data)
    }
  ).catch(error => console.log(error));
});



app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(random => {
    console.log(random);
    res.render('random-beer', random[0]);
  })
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
