const { uuid, createPayload, sendResponse } = require('../utils');
const { addGame, getGame, joinGame } = require('../store');

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
        payload = createPayload('alert', {
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

module.exports = {
    create,
    join
}