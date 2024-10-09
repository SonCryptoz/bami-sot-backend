const UserService = require("../../services/UserService");
const JwtService = require("../../services/JwtService");

const createUser = (req, res) => {
    const { name, email, password, confirmPassword, phone } = req.body;

    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = validRegex.test(email);

    if (!name || !email || !password || !confirmPassword || !phone) {
        return res.status(200).json({
            status: 'error',
            message: 'The input is required',
        });
    } 
    else if (!isCheckEmail) {
        return res.status(200).json({
            status: 'error',
            message: 'The input must to be an email',
        });
    } 
    else if (password !== confirmPassword) {
        return res.status(200).json({
            status: 'error',
            message: 'The password is not equal to the confirmPassword',
        });
    }

    UserService.createUser(req.body)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(e => {
            return res.status(404).json({
                message: e,
            });
        });
};

const loginUser = (req, res) => {
    const { name, email, password, confirmPassword, phone } = req.body;

    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = validRegex.test(email);

    if (!name || !email || !password || !confirmPassword || !phone) {
        return res.status(200).json({
            status: 'error',
            message: 'The input is required',
        });
    } 
    else if (!isCheckEmail) {
        return res.status(200).json({
            status: 'error',
            message: 'The input must to be an email',
        });
    } 
    else if (password !== confirmPassword) {
        return res.status(200).json({
            status: 'error',
            message: 'The password is not equal to the confirmPassword',
        });
    }

    UserService.loginUser(req.body)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(e => {
            return res.status(404).json({
                message: e,
            });
        });
};

const updateUser = (req, res) => {
    const userId = req.params.id;
    const data = req.body;

    if(!userId){
        return res.status(200).json({
            status: 'error',
            message: 'The userID is required',
        });
    }

    UserService.updateUser(userId, data)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(e => {
            return res.status(404).json({
                message: e,
            });
        });
};

const deleteUser = (req, res) => {
    const userId = req.params.id;
    const token = req.headers;

    if(!userId){
        return res.status(200).json({
            status: 'error',
            message: 'The userID is required',
        });
    }

    UserService.deleteUser(userId)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(e => {
            return res.status(404).json({
                message: e,
            });
        });
};

const getAllUsers = (req, res) => {
    UserService.getAllUsers()
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(e => {
            return res.status(404).json({
                message: e,
            });
        });
};

const getDetailsUser = (req, res) => {
    const userId = req.params.id;
    const token = req.headers;

    if(!userId){
        return res.status(200).json({
            status: 'error',
            message: 'The userID is required',
        });
    }

    UserService.getDetailsUser(userId)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(e => {
            return res.status(404).json({
                message: e,
            });
        });
};

const refreshToken = (req, res) => {
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

    JwtService.refreshTokenJWT(token)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(e => {
            return res.status(404).json({
                message: e.message || "Error refreshing token",
                status: "Error",
            });
        });
};

module.exports = { createUser, loginUser, updateUser, deleteUser, getAllUsers, getDetailsUser, refreshToken };
