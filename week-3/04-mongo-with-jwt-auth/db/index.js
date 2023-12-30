const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING);

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    image: String,
    price: String

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}