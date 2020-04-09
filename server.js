'use strict';

// Libraries:
require('dotenv').config();
require('ejs');
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');


const handlebars = require('handlebars');
const template = handlebars.compile('name: {{name}}');
console.log(template({ name: 'Nils'}));

// Global variables
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());                          // allows everyone to access our information
app.use(express.static('./public'));      // serves our static files from 'public' folder
app.set('view engine', 'ejs');            // ejs template - searches 'views' folder first
app.use(express.urlencoded({extended:true})); // body parser
app.use(methodOverride('_method'));       // Allows us to convert POST or GET into PUT or DELETE













// setup postgres
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

// Turn on server once database is connected - ELSE Error: connect ECONNREFUSED 127.0.0.1:5432...
client.connect()
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
});
