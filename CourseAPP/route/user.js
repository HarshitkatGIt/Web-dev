const express = require('express');
const route = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { userDB, courseDB } = require('../db/db');
const userMiddleware = require('../middleware/user');
const mongoose = require('mongoose');

route.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!(username && password)) return res.status(403).send('Username Password are required');

    const usernameCheck = zod.email(username);
    const passwordCheck = zod.string().min(8).refine(
        val => (/[^A-Za-z0-9]/).test(val)
    ).refine(
        val => (/[A-Z]/).test(val)
    ).refine(
        val => (/[0-9]/).test(val)
    )
    const a = usernameCheck.safeParse(username).success;
    const b = passwordCheck.safeParse(password).success;
    if (!(a && b)) return res.status(403).send('invalid format for username or password');

    const newUser = new userDB({ username, password });
    await newUser.save();
    res.send('User Created');
})

route.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const findUser = await userDB.findOne({ username, password });
    console.log(findUser);
    if (!findUser) return res.status(404).send('User Not Found');

    const token = jwt.sign({ username, password }, "YeGaanaHaiSazaEmaut");
    res.send(token);
})

route.get('/courses', async (req, res) => {
    res.send(await courseDB.find());

})

route.post('/courses/:courseID', userMiddleware, async (req, res) => {
    const courseID = req.params.courseID;
    const username = req.headers.username;
    console.log(username);
    const findUsername = await userDB.findOne({ username });
    console.log(findUsername);
    const findCourse = await courseDB.findOne({ _id: courseID });
    const updateCourse = await userDB.updateOne({ username }, {
        "$push": { purchasedCourses: courseID }
    })
    if (updateCourse.modifiedCount) res.send('hogya');
    else res.send('nahi hua').status(403);
    console.log(updateCourse);
})

route.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const username = req.headers.username;
    const finduser = await userDB.findOne({ username });
    const id = finduser.purchasedCourses;
    const findcourse = await courseDB.findOne({ _id: id })
    res.send(findcourse);
})
module.exports = route;