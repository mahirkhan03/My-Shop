var jwt = require('jsonwebtoken');

function createuniqueimage(image) {
    const time = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${random}_${time}_${image}`;

}

const generateToken = (token) => jwt.sign(token, process.env.SECRET_KEY);
const verifyToken = (token) => jwt.verify(token, process.env.SECRET_KEY);


module.exports = { createuniqueimage, generateToken, verifyToken };