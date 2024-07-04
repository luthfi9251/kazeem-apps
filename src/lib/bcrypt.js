const bcrypt = require("bcrypt");

function hashPassword(string) {
    return bcrypt.hashSync(string, 10);
}

function comparePassword(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
}

module.exports = {
    hashPassword,
    comparePassword,
};
