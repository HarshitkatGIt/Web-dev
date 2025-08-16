const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Harshitkap:H9IWYEuFA7XTfnSZ@cluster0.xiqqzu0.mongodb.net/ToDo')

const createSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('todo', createSchema);