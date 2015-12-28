/**
 * Created by ivan.makarov@mev.com on 20.12.15.
 */
'use strict';

(function() {
    var _ = require('underscore'),
        express = require('express'),
        app = express(),
        http = require('http'),
        server = http.Server(app),
        logger = require('morgan'),
        config = require('jsonfile').readFileSync('config/config.server.json'),
        path = require('path');

    ///////////////

    app.use(logger(':method :status :url (:response-time ms)'));
    app.use(express.static('public'));

    runServer();

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    ///////////////

    function runServer() {
        var port = config.server.port,
            host = config.server.host;

        if (!port || !host) { throw new Error('Required values of host/port missed.'); }

        server.listen(port, host, function () {
            console.log('Example app listening at http://%s:%s', host, port);
        });
    }
})();