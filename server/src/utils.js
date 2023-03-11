function uuid() {
    return Date.now();
};

function parse(message) {
    return JSON.parse(message);
}

function stringify(message) {
    return JSON.stringify(message);
}

module.exports = {
    uuid,
    parse,
    stringify
}