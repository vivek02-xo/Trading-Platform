require("dotenv").config();

const jwt = require("jsonwebtoken");

// jwt.sign(payload, secretKey, options);

module.exports.createSecretToken = (id) => {
    return jwt.sign({id} , process.env.TOKEN_KEY, {
        expiresIn: 4 * 24 * 60 * 60,
    });
}