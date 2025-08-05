const express = require('express');
const adminMiddleware = require('../middleware/admin')
const router = express.Router();
const {admin,course} = require('../db/db')


router.post('/signup',async (req,res)=>{
    console.log('agya bhai');
    const username = req.body.username;
    const password = req.body.password;

    const createAdmin = new admin({
        username : username,
        password : password
    })
    try{
        const a = await createAdmin.save();
        console.log(a);
        res.send('admin created successfully');
    }
    catch(err){console.log(err);res.status(403).send('some error occured')}
    
})
router.post('/courses',adminMiddleware,async (req,res)=>{
    const title = req.body.title;
    const Description = req.body.Description;
    const ImageLink = req.body.ImageLinkl;
    const Price = parseInt(req.body.Price);

    const courseSet = new course({
        title : title,
        Description : Description,
        ImageLink :  ImageLink,
        Price : Price
    })
    try{
        const check = await courseSet.save();
        console.log(check)
        res.send(`course updated ${check._id}`);
    }
    catch(err){console.log(err);res.status(403).send('some error occured')}
})
router.get('/courses',adminMiddleware,async (req,res)=>{
    const response = await course.find();
    res.json({
        courses:response
    })
})
module.exports = router;