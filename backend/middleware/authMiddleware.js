const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    // validate the token using a jwt secret key, if token is valid, the decoded payload will be available in the decoded variable
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // userId extracted from the decoded payload and is attached to the req object
        req.userId = decoded.userId;
        next();
    });
};
