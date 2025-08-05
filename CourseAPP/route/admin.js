const express = require('express');
const route = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { adminDB, courseDB } = require('../db/db');
const adminMiddleware = require('../middleware/admin');

route.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) return res.status(403).send('invalid credentials');

    const checkEmail = zod.email(username);
    const checkPassword = zod.string().min(8).refine(
        val => (/[^A-Za-z0-9]/).test(val)
    ).refine(
        val => (/[A-Z]/).test(val)
    ).refine(
        val => (/[0-9]/).test(val)
    )
    const a = checkEmail.safeParse(username).success;
    const b = checkPassword.safeParse(password).success;
    if (!(a && b)) return res.status(403).send('invalid credential format');

    const newadmin = new adminDB({
        username, password
    })
    try {
        await newadmin.save()
    } catch (err) { console.log(err); res.send(501).send('some server error'); }
    res.send('User created Successfully');

})

route.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const findAdmin = await adminDB.findOne({ username, password });
    if (!findAdmin) return res.status(404).send('Admin Not Found');
    const jwtpass = "TooManySnakesToBlame"
    const token = jwt.sign({ username, password }, jwtpass);
    res.send(token);
})

route.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const Description = req.body.Description;
    const Price = req.body.Price;

    if (!(title && Description && Price)) return res.status(403).send('Not Accurate Description of Course');
    const createCourse = new courseDB({
        title, Description, Price
    })
    try {
        await createCourse.save();
        res.send('Course Added Successfully')
    }
    catch (err) { console.log(err); res.status(501).send("couldn't create the course"); }

});

route.get('/courses', adminMiddleware, async (req, res) => {
    try { const Courses = await courseDB.find(); res.send(Courses); }
    catch (err) { console.log(err); return res.status(501).send("couldn't fetch the courses") }

})
module.exports = route;