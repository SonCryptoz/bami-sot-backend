const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const auth = (req, res, next) => {
    const authHeader = req.headers.token;

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided",
            status: "Error",
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: "Invalid token",
                status: "Error",
            });
        }

        const { payload } = user;
        if (payload?.isAdmin) {
            next();
        } 
        else {
            return res.status(403).json({
                message: "Not authorized",
                status: "Error",
            });
        }
    });
};

const authUser = (req, res, next) => {
    const authHeader = req.headers.token;

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided",
            status: "Error",
        });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
        return res.status(401).json({
            message: "Invalid token format",
            status: "Error",
        });
    }

    const token = tokenParts[1];
    const userId = req.params.id;

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: "Invalid token",
                status: "Error",
            });
        }

        const { payload } = user;
        if (payload?.isAdmin || (!userId || payload?.id === userId)) {
            // Nếu có userId, chỉ cho phép truy cập nếu token thuộc về người dùng
            next();
        } else {
            return res.status(403).json({
                message: "Not authorized",
                status: "Error",
            });
        }
    });
};

module.exports = { auth, authUser };
