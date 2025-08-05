jwt = require('jsonwebtoken');
function userMiddleware(req, res, next) {
    let token = req.headers.authorization;
    token = token.split(' ');
    token = token[1];
    const verifyUser = jwt.verify(token, "YeGaanaHaiSazaEmaut");
    if (!verifyUser.username) return res.send("Couldn't get user").status(404);
    next();
}
module.exports = userMiddleware;