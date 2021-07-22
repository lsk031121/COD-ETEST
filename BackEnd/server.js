var express = require('express');

var conf = require('./conf');
var ApiRoutes = require('./api/routes/ApiRoutes');
 
var app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mysql = require('mysql');
 

app.use('/ApiRoutes', ApiRoutes);
 
app.listen(conf.port, function () {
    const connection = mysql.createConnection(conf.db);
    connection.connect();

    connection.query('SHOW DATABASES', function (error, results, fields) {
        if (error)
            console.log(error)
        console.log(results)
    });
    console.log('app listening on port ' + conf.port + '!');
});