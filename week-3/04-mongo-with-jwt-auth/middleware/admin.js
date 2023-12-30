const jwt = require('jsonwebtoken')
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const authorization = req.headers.authorization;

    const token = authorization.split(" ")[1];
    try {
        const isAdmin = jwt.decode(token, process.env.JWT_SECRET);
        req.username = isAdmin.username;
        next();
    } catch (error) {
        res.send("Error in Authentication of Admin")
    }



}

module.exports = adminMiddleware;