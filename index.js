// pkg
const http = require('http');
const express = require('express');
const WebSocket = require('websocket').server;

// hosted FrontEnd
const hostHtml = require('./server/hostHtml.js');
hostHtml(express, __dirname);

// server
const httpServer = http.createServer();
httpServer.listen(3001, () => console.log('server is running!'));

// web socket
const ws = new WebSocket({
    'httpServer': httpServer
});
const wsLisner = require('./server/src/webSocket/wsListener');
wsLisner(ws);