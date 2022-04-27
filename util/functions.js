const fs = require("fs");

function getFiles (path, ending) {
    return fs.readdirSync(path).filter(f => f.endsWith(ending));
}

module.exports = { getFiles };