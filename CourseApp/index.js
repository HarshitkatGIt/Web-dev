const express = require('express');
let app = express();
app.use(express.json());
const userRoute = require('./route/user');
const adminRoute = require('./route/admin');

app.use('/user', userRoute);
app.use('/admin', adminRoute);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(403).send('invalid data');
})
app.listen(3000, () => console.log('hogya'));

// if you are exception handling make sure you return res.send , with only res.send code continous apparently 
// idk exactly know why , but just be on the safe side
// i still dont get how purchasedCourses works
