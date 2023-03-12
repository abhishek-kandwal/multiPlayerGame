const { v4: uuidv4 } = require('uuid');
const { getClientConnection } = require('./store');

function uuid() {
    return uuidv4();
};

function parse(message) {
    return JSON.parse(message);
}

function stringify(message) {
    return JSON.stringify(message);
}

function createPayload(method, data) {
    return stringify({
        method,
        data
    });
}

function sendResponse(clientId, payload) {
    const connection = getClientConnection(clientId);
    if (connection) {
        connection.send(payload);
    }
}

module.exports = {
    uuid,
    parse,
    stringify,
    createPayload,
    sendResponse
}