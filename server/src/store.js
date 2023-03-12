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

const playGame = (clientId, gameId, btnId) => {
    const { clients } = store.games[gameId];
    const clientData = clients.filter(obj => obj.clientId === clientId)[0];
    if (!clientData.selectedTiles.includes(btnId)) {
        clientData.score += 1;
        clientData.selectedTiles.push(btnId);

        return true;
    }

    return false;
}

const getGameClients = (gameId) => {
    const { clients } = store.games[gameId];
    return clients.map(clientObj => ({ clientId: clientObj.clientId, color: clientObj.color }));
}

module.exports = {
    addClientToConnection,
    getClientConnection,
    addGame,
    getGame,
    joinGame,
    playGame,
    getGameClients
}