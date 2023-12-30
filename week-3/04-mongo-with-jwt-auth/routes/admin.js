const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken")
const { Admin, Course } = require('../db');


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    try {
        await Admin.create({ username, password });
        res.status(200).json({
            msg: "Admin Created successfully"
        });
    } catch (error) {
        res.status(401).json({
            msg: " Error while creating Admin "
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    try {
        const admin = await Admin.find({ username, password });
        console.log(admin.length);

        if (admin.length > 0) {
            let token = jwt.sign({ username }, process.env.JWT_SECRET);
            console.log(token);
            res.status(200).json({
                token
            })
        } else {
            res.status(401).json({
                msg: " Error while creating Admin "
            })
        }
    } catch (error) {
        res.status(401).json({
            msg: " Error while creating Admin "
        })
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    try {
        const course = await Course.create({ title, description, price, imageLink });
        console.log(course._id);
        res.status(200).json(
            { message: 'Course created successfully', courseId: course._id }
        )
    } catch (error) {
        res.send({ "msg": "Error while creating course" });
    }

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const course = await Course.find({});
        res.status(200).json(
            { courses: course }
        )
    } catch (error) {
        res.send({ "msg": "Error while getting all course" });
    }
});

module.exports = router;