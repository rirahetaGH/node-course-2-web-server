const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port=process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n')
  next();
});

//app.use((req, res, next) => {
//  res.render('maintenance.hbs');
//});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});



app.get('/', (req, res) => {
  //  res.send('<h1>Hello Express!</h1>');
  /*res.send({
      name:'Rutilio',
      likes:['Biking',
    'Cities']
  });*/
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  //  res.send('<h1>Hello Express!</h1>');
  //res.send('<h1>About Page</h1>');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errrorMessage: 'Unable to handle the request'
  });
});

/*app.listen(3000, () => {
  console.log('Server is up on port 3000');
});*/

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});