//import Express Module
const express = require('express');
//import body-parser Module
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');


// Connecting to the database
mongoose.connect(dbConfig.connectionString, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')}
    );

      

// Require Notes routes
require('./app/routes/article.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});