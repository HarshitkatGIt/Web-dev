const express = require('express');
const app = express();
app.use(express.json());
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

app.use(express.json());
app.use('/admin',adminRouter);
app.use('/user',userRouter);

app.listen(3000,()=>console.log('hogya bhai'));

// a lot of zod shit , and more protection is needed 
/*
Eg. when creating a user or admin, bullshit json doesn't give error it just creates user or admin with id only
*/