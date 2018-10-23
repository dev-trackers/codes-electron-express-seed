'use strict';

module.exports = () => {
    let pr = new Promise(function (resolve, reject) {
        try {
            // Load The FS Module & The Config File
        const fs = require('fs');

        // Load The Path Module
        const path = require('path');

        const config = JSON.parse(fs.readFileSync('config.json'));

        // Load Express Module
        const express = require('express');
        let app = express();

        // Load Body Parser Module
        const bodyParser = require('body-parser');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        // Load Express Session Module
        const session = require('express-session');
        app.use(session({
            // Setup Session Middleware
            secret: config.session.secret,
            saveUninitialized: true,
            resave: true
        }));

        // Setup Globally Included Directories
        app.use('/', express.static(path.join(__dirname, 'client')));

        // Start The HTTP Server
        app.listen(config.server.port, config.server.host, function () {
            resolve('Started');
        });
        } catch(e) {
            reject('Failed');
        }
    });
    return pr;
}