const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');


let routesPing = require('./routes/ping');
let routesUsers = require('./routes/users');
let routesProducts = require('./routes/products');
let routesCart = require('./routes/cart');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(xmlparser({trim: false, explicitArray: false}));

app.use('/ping', routesPing);
app.use('/users', routesUsers);
app.use('/products', routesProducts);
app.use('/cart', routesCart);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
  
// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.sendStatus(err.status || 500);
  });
}
  
// production error handler
app.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);
});


module.exports = app;