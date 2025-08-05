const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Harshitkap:H9IWYEuFA7XTfnSZ@cluster0.xiqqzu0.mongodb.net/')

const adminSchema = new mongoose.Schema({
    username : String,
    password : String
})
const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : ''
    }]
})
const courseSchema = new mongoose.Schema({
    title : String,
    Description : String,
    ImageLink : String,
    Price : Number
})

const admin = mongoose.model('admins',adminSchema);
const user = mongoose.model('users',userSchema);
const course = mongoose.model('courses',courseSchema);

module.exports = {admin,user,course}