var express = require('express');
var accounts = require('../models/ApiModel');

var router = express.Router();

router.route('/')

    .get(function (req, res) {
        accounts.listallplan(req, function ( results,err, fields) {
            console.log(results)
            console.log(err)
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }
            if (!results.size) {
                res.sendStatus(404);
                return;
            }
            res.send(Object.fromEntries(results))
        });
    })



module.exports = router;