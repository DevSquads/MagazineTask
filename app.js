const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config');

const articleRouter = require('./router/article');


const app = express();


mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{

        console.log('- Connected successfully to database -');

        // Middlwares
        app.use(logger('dev'));
        app.use(bodyParser.json());

        // Routes
        app.use('/article', articleRouter);

        // Catch 404 and forward to error handler
        app.use((req, res, next)=>{
            next(createError(404));
        });

        // Error handler
        app.use((err, req, res, next)=>{

            // Set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development'? err : {};

            // Render the error page
            res.status(err.status || 500);
            res.send('error');
        });

        app.listen(config.port, ()=> console.log(`- Server is listening on port ${config.port}`));
    })
    .catch(err => console.log('- Error while connecting to database', err));

module.exports = app;