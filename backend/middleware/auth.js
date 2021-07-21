const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        let token = req.header("x-auth-token");

        console.log(req.header("x-auth-token"));
        if (token === 'undefined' || token === 'null' || token === 'false' || token === '') token = null;
        if (!token)
            return res.status(401).json({ msg: 'No authentication token, authorization denied.' });
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.status(401).json({ msg: 'Token verification failed, authorization denied.' })
        req.userID = verified.id;

        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

module.exports = auth;
