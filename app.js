
const express = require('express');
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const request = require("request");
const bodyParser = require("body-parser");

const https = require('https');
const fs = require('fs');


const exphbs = require('express-handlebars');
const app = express();


const session = require('express-session');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('index', {
    stripePublicKey: keys.stripePublicKey
  });
});

app.post('/charge', (req, res) => {
    const amount = 10000;
    stripe.customers.create({
     email: req.body.stripeEmail,
     source: req.body.stripeToken
   })
    .then(customer => stripe.charges.create({
      amount,
      description: 'Training Session',
      currency: 'usd',
      customer: customer.id
    }))
    .then(charge => res.render('success'));
});





app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
