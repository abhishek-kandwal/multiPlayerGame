const { addClientToConnection } = require('../store');
const { uuid, createPayload } = require('../utils');
const wsEvents = require('./wsEvents');

module.exports = (ws) => {
    ws.on('request', req => {
        const connection = req.accept(null, req.origin);
        connection.on('open', () => console.log('open'));
        connection.on('close', () => console.log('closed'));
        connection.on('message', message => wsEvents(message));
        
        const clientId = uuid();
        addClientToConnection(clientId, connection);
        const payload = createPayload   ('connect', {
            clientId
        });

        connection.send(payload);
    });
};