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
app.use(express.static('./public'));      // serves our static files from public
app.set('view engine', 'ejs');            // ejs template
app.use(express.urlencoded({extended:true})); // body parser
app.use(methodOverride('_method'));       // Allows us to convert POST or GET into PUT or DELETE

// setup postgres
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

// Turn on server once database is connected
client.connect()
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
});
