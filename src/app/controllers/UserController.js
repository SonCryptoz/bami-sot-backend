const UserService = require("../../services/UserService");
const JwtService = require("../../services/JwtService");

const createUser = (req, res) => {
    const { name, email, password, confirmPassword, phone } = req.body;

    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = validRegex.test(email);

    if (!name || !email || !password || !confirmPassword || !phone) {
        return res.status(200).json({
            status: 'error',
            message: 'Vui lòng nhập đầy đủ thông tin',
        });
    } 
    else if (!isCheckEmail) {
        return res.status(200).json({
            status: 'error',
            message: 'Trường nhập phải là email hợp lệ',
        });
    } 
    else if(isNaN(Number(phone)) || phone.length < 10 || phone.length > 11) {
        return res.status(200).json({
            status: 'error',
            message: 'Trường nhập phải là số điện thoại',
        });
    }
    else if (password !== confirmPassword) {
        return res.status(200).json({
            status: 'error',
            message: 'Mật khẩu hoặc mật khẩu xác nhận không trùng khớp',
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
    const { email, password } = req.body;

    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = validRegex.test(email);

    if (!email || !password) {
        return res.status(200).json({
            status: 'error',
            message: 'Vui lòng nhập đầy đủ thông tin',
        });
    } 
    else if (!isCheckEmail) {
        return res.status(200).json({
            status: 'error',
            message: 'Trường nhập phải là email',
        });
    } 

    UserService.loginUser(req.body)
        .then(response => {
            const { refresh_token, access_token, ...userData } = response;

            // Thiết lập cookie chứa refresh_token
            res.cookie("refresh_token", refresh_token, {
                httpOnly: true,      // Bảo mật: cookie chỉ được sử dụng bởi server
                secure: true,        // Chỉ gửi cookie qua HTTPS
                sameSite: "Strict",  // Không gửi cookie đến các trang khác
            });

            // Trả về access_token và thông tin người dùng cho client
            return res.status(200).json({
                status: 'success',
                message: 'Đăng nhập thành công',
                access_token,  // Trả về access_token cho client
                ...userData,   // Thông tin người dùng khác
            });
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
    const token = req.cookies.refresh_token;

    if (!token) {
        return res.status(401).json({
            message: "No token provided",
            status: "Error",
        });
    }

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

const logoutUser = (req, res) => {
    res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    });

    return res.status(200).json({
        status: "OK",
        message: "Logged out successfully",
    });
};

module.exports = { createUser, loginUser, updateUser, deleteUser, getAllUsers, getDetailsUser, refreshToken, logoutUser };
