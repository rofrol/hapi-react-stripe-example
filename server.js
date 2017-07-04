'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
server.connection({ port: 3003, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.register(require('inert'), (err) => {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/index.js',
        handler: function (request, reply) {
            reply.file('index.js');
        }
    });

    server.route({
        method: 'GET',
        path: '/node_modules/{file*}',
        handler: {
            directory: {
                path: 'node_modules'
            }
        }
    })

});



server.start(err => {
    if (err) {
        throw err;
    }
    console.log(`Server running at ${server.info.uri}`);
});