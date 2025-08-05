const { admin } = require('../db/db');
async function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    try {
        admininfo = await admin.findOne({ username: username, password: password });
        if(!admininfo)throw('no admin found');
        console.log(admininfo);next();
    }
    catch (err) { console.log(err); res.status(403).send('no admin found');};
    
}
module.exports = adminMiddleware;