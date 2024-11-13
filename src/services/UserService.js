const User = require("../app/models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
    return new Promise((resolve, reject) => {
        const { name, email, password, phone } = newUser;

        User.findOne({ email: email })
            .then((checkUser) => {
                if (checkUser) {
                    return resolve({
                        status: "error",
                        message: "Email đã tồn tại",
                    });
                }

                const hash = bcrypt.hashSync(password, 10);

                return User.create({
                    name,
                    email,
                    password: hash,
                    phone,
                });
            })
            .then((createdUser) => {
                if (createdUser) {
                    resolve({
                        status: "success",
                        message: "Tạo tài khoản thành công",
                        data: createdUser,
                    });
                }
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "Có lỗi xảy ra khi tạo tài khoản",
                    error: err,
                });
            });
    });
};

const loginUser = (userLogin) => {
    return new Promise((resolve, reject) => {
        const { email, password } = userLogin;

        User.findOne({ email: email })
            .then((checkUser) => {
                if (!checkUser) {
                    return resolve({
                        status: "error",
                        message: "Email này không tồn tại",
                    });
                }

                const comparePassword = bcrypt.compareSync(password, checkUser.password);

                if (!comparePassword) {
                    return resolve({
                        status: "error",
                        message: "Email hoặc mật khẩu không chính xác",
                    });
                }

                return Promise.all([
                    generalAccessToken({
                        id: checkUser.id,
                        isAdmin: checkUser.isAdmin,
                    }),
                    generalRefreshToken({
                        id: checkUser.id,
                        isAdmin: checkUser.isAdmin,
                    }),
                ]);
            })
            .then(([access_token, refresh_token]) => { 
                resolve({
                    status: "success",
                    message: "Đăng nhập thành công",
                    access_token,
                    refresh_token,
                });
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "Có lỗi xảy ra khi đăng nhập",
                    error: err,
                });
            });
    });
};

const updateUser = (id, data) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: id })
            .then((checkUser) => {
                if (!checkUser) {
                    return resolve({
                        status: "error",
                        message: "User does not exist",
                    });
                }

                // Cập nhật người dùng và trả về phiên bản mới
                return User.findByIdAndUpdate(id, data, { new: true });
            })
            .then((updatedUser) => {
                if (!updatedUser) {
                    return resolve({
                        status: "error",
                        message: "Cập nhật người dùng không thành công",
                    });
                }

                resolve({
                    status: "success",
                    message: "Cập nhật người dùng thành công",
                    data: updatedUser,
                });
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "Có lỗi xảy ra khi cập nhật người dùng",
                    error: err,
                });
            });
    });
};

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: id })
            .then((checkUser) => {
                if (!checkUser) {
                    return resolve({
                        status: "error",
                        message: "Người dùng không tồn tại",
                    });
                }

                // Xóa người dùng
                return User.findByIdAndDelete(id);
            })
            .then((deletedUser) => {
                if (!deletedUser) {
                    return resolve({
                        status: "error",
                        message: "Xóa người dùng không thành công",
                    });
                }

                resolve({
                    status: "success",
                    message: "Xóa người dùng thành công",
                });
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "Có lỗi xảy ra khi xóa người dùng",
                    error: err,
                });
            });
    });
};

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find()
            .then((checkUser) => {
                if (!checkUser) {
                    return resolve({
                        status: "error",
                        message: "Người dùng không tồn tại",
                    });
                }
                else{
                    return resolve({
                        status: "success",
                        message: "Tất cả người dùng",
                        data: checkUser,
                    });
                }
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "Có lỗi xảy ra khi hiển thị tất cả người dùng",
                    error: err,
                });
            });
    });
};

const getDetailsUser = (id) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: id })
            .then((checkUser) => {
                if (!checkUser) {
                    return resolve({
                        status: "error",
                        message: "Người dùng không tồn tại",
                    });
                }
                else{
                    return resolve({
                        status: "success",
                        message: "Chi tiết người dùng",
                        data: checkUser,
                    });
                }
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "Có lỗi xảy ra khi hiển thị chi tiết người dùng",
                    error: err,
                });
            });
    });
};

module.exports = { createUser, loginUser, updateUser, deleteUser, getAllUsers, getDetailsUser };
