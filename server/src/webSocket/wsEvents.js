const { parse, stringify } = require('../utils');
const reqMapper = require('./controller');

const reqExecuter = (req) => {
    const { method, data } = req;
    const methodExecuter = reqMapper[method];
    if (methodExecuter) {
        methodExecuter(data);
    }
}

module.exports = function (message) {
    const req = parse(message.utf8Data);
    reqExecuter(req);
}