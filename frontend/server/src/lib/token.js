const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

function generateToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            jwtSecret,
            {
                expiresIn: '1d',
            },
            (error, token) => {
                if (error) reject(error);
                resolve(token);
            },
        );
    });
}

function decodeToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}

function validateAccessToken(accessToken) {}

exports.decodeToken = decodeToken;
exports.generateToken = generateToken;
