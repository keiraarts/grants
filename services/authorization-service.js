const jwt = require('jsonwebtoken');

module.exports = (token, res, callback) => {
    try {
        const jwtUser = jwt.verify(token, ENV.JWT);
        return callback(jwtUser);
    } catch (err) {
        console.log('JWT ERROR: ', err.message);
        return res.status(500).json('Authorization error');
    }
};
