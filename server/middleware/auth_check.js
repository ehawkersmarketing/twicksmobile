const jwt = require('jsonwebtoken');

exports.checkAuth = () => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
        next();
    } else {
        res.json({
            success: false,
            message: "Invalid token"
        });
    }
};