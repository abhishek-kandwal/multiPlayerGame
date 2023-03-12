const store = {
    connections: {},
    games: {}
}

function colorPicker(index) {
    const colorTable = ['red', 'green', 'blue'];
    return colorTable[index];
}

const addClientToConnection = (clientId, connection) => {
    const { connections } = store;
    connections[clientId] = connection;
}

const getClientConnection = (clientId) => {
    const { connections } = store;
    return connections[clientId];
}

const addGame = (clientId, gameId) => {
    const { games } = store;
    games[gameId] = {
        size: 20,
        clients: [
            {
                clientId,
                color: colorPicker(0),
                score: 0,
                selectedTiles: []
            }
        ]
    };
}

const getGame = (gameId) => {
    const { games } = store;
    return games[gameId];
}

const joinGame = (clientId, gameId) => {
    const { clients } = store.games[gameId];
    const clientLength = clients.length;
    
    if (clientLength > 3) return [false, -1];

    const clientIdx = clientLength;
    const newClient = {
        clientId,
        color: colorPicker(clientLength),
        score: 0,
        selectedTiles: []
    };

    clients.push(newClient);
    return [true, clientIdx];
}

module.exports = {
    addClientToConnection,
    getClientConnection,
    addGame,
    getGame,
    joinGame
}