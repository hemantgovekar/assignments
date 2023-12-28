const { User } = require('../db/index');

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            res.json({ msg: "username or password is not correct" });
            return;
        }
    } catch (error) {
        console.log(error);
    }

    next();
}

module.exports = userMiddleware;