const { uuid, createPayload, sendResponse } = require('../utils');
const { addGame, getGame, joinGame, getGameClients, playGame } = require('../store');

function create(req) {
    const { clientId } = req;
    const gameId = uuid();
    addGame(clientId, gameId);

    const game = getGame(gameId);
    const payload = createPayload('create', {
        ...game.clients[0],
        gameId,
        size: game.size,
    });

    sendResponse(clientId, payload);
}

function join(req) {
    const { clientId, gameId } = req;
    const [isAdded, clientIdx] = joinGame(clientId, gameId);

    let payload = null
    if (!isAdded) {
        payload = createPayload('alertClient', {
            message: 'Game Lobby Full'
        });
    } else {
        const game = getGame(gameId);
        payload = createPayload('join', {
            ...game.clients[clientIdx],
            gameId,
            size: game.size,
        });
    }

    sendResponse(clientId, payload);
}

function play(req) {
    const { clientId, gameId, btnId } = req;
    const isUpdated = playGame(clientId, gameId, btnId);

    if (isUpdated) {
        const clients = getGameClients(gameId);
        const currentClientData = clients.filter(clientsObj => clientsObj.clientId === clientId)[0];

        let payload = createPayload('play', {
            btnId,
            color: currentClientData.color
        });

        if (clients) {
            for (let clientObj of clients) {
                if (clientObj.clientId !== currentClientData.clientId) {
                    sendResponse(clientObj.clientId, payload);
                }
            }
        }
    }
}

module.exports = {
    create,
    join,
    play
}