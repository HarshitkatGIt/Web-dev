const {user} = require('../db/db');
async function userMiddleware(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;

    try{
        const userinfo = await user.findOne({username:username,password:password});
        if(!userinfo)throw('no user found')
    }catch(err){console.log(err);res.status(403).send('no user found');}
    next();
}
module.exports = userMiddleware;