const jwt = require('jsonwebtoken');
function adminMiddleware(req, res, next) {
    let token = req.headers.authorization;
    token = token.split(' ');
    token = token[1];
    console.log(token)

    try {
        const verifyAdmin = jwt.verify(token, "TooManySnakesToBlame");
        if (verifyAdmin.username) next();
    }
    catch (err) { console.log(err); return res.send("can't verify admin").status(404); }
}

module.exports = adminMiddleware;