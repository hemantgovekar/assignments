const { Router } = require("express");
const { Admin, Course } = require('../db/index')
const adminMiddleware = require("../middleware/admin");
const router = Router();


// Admin Routes
router.post('/signup', async (req, res) => {

    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;


    if (username !== "" && password !== "") {
        await Admin.create({ "username": username, "password": password }).
            then((adminCreated) => {
                res.status(200).json({
                    msg: "Admin Created successfully " + adminCreated
                })
            })
            .catch((err) => {
                res.status(500).json({
                    msg: "error occured" + err
                })
            });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink } = req.body;
    const course = await Course.create({ title, description, price, imageLink });
    res.json({ message: 'Course created successfully', courseId: course.id });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find();
    res.json(courses);
});

module.exports = router;
