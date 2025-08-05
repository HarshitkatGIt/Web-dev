const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Harshitkap:H9IWYEuFA7XTfnSZ@cluster0.xiqqzu0.mongodb.net/App');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseDB'
    }]
})
const adminSchema = mongoose.Schema({
    username: String,
    password: String
})
const courseSchema = mongoose.Schema({
    title: String,
    Description: String,
    Price: Number
})
const userDB = mongoose.model('users', userSchema);
const adminDB = mongoose.model('admins', adminSchema);
const courseDB = mongoose.model('courses', courseSchema);

module.exports = {
    userDB, adminDB, courseDB
}