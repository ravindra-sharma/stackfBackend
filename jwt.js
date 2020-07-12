const expressJwt = require('express-jwt');

function jwt() {
    const secret = "Ravindra's Secret. Wont tell you";
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            '/users/authenticate',
            '/ping',
            '/',
            '/manifest.json',
            '/favicon.ico',
            '/static/css/main.a66e996d.chunk.css',
            '/static/js/2.e99f76ec.chunk.js',
            '/static/js/main.67d8a820.chunk.js',
            '/logo192.png'
        ]
    });
}

module.exports = jwt;