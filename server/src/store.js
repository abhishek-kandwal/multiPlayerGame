const store = {
    connections: {}
}

const addClientToConnection = (clientId, connection) => {
    const { connections } = store;
    connections[clientId] = connection;
}

const getClientConnection = (clientId, connection) => {
    const { connections } = store;
    return connections[clientId];
}

module.exports = {
    addClientToConnection,
    getClientConnection
}