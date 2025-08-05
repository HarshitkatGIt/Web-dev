const express = require('express');
const userMiddleware = require('../middleware/user')
const router = express.Router();
const {user,course} = require('../db/db');

router.post('/signup',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const createUser = new user({
        username : username,
        password : password
    })
    try{
        const a = await createUser.save();
        console.log(a);
    }
    catch(err){console.log(err);}
    res.send('user created successfully');
})
router.post('/courses/:courseID',userMiddleware,async (req,res)=>{
    const id = req.params.courseID;
    const username = req.headers.username;

    try{
        const purchaseinfo = await user.updateOne({username:username},
            {'$push':{
                purchasedCourses:id
            }}
        )
        console.log(purchaseinfo);
        res.send('purchased successfully');
    }
    catch(err){
        console.log(err);
        res.status(403).send('some error occured')
    }
    
})
router.get('/courses',userMiddleware,async (req,res)=>{
    const response = await course.find();
    res.json({
        courses:response
    })
})
router.get('/purchasedCourses',userMiddleware,async (req,res)=>{
    const username = req.headers.username;
    let User;
    try{
        User = await user.findOne({username:username});
        console.log(User);
    }catch(err){console.log(err);}
    console.log(User.purchasedCourses);

    try{const courses = await course.find({
        _id:{
            "$in":User.purchasedCourses
        }
    })
    res.send(courses)}
    catch(err){console.log(err);}

})

module.exports = router;