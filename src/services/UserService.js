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
                        message: "Failed to update user",
                    });
                }

                resolve({
                    status: "success",
                    message: "User updated successfully",
                    data: updatedUser,
                });
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "An error occurred while updating user",
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
                        message: "User does not exist",
                    });
                }

                // Xóa người dùng
                return User.findByIdAndDelete(id);
            })
            .then((deletedUser) => {
                if (!deletedUser) {
                    return resolve({
                        status: "error",
                        message: "Failed to delete user",
                    });
                }

                resolve({
                    status: "success",
                    message: "User deleted successfully",
                });
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "An error occurred while deleting user",
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
                        message: "User does not exist",
                    });
                }
                else{
                    return resolve({
                        status: "success",
                        message: "All users",
                        data: checkUser,
                    });
                }
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "An error occurred while rendering all users",
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
                        message: "User does not exist",
                    });
                }
                else{
                    return resolve({
                        status: "success",
                        message: "User details",
                        data: checkUser,
                    });
                }
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "An error occurred while rendering user details",
                    error: err,
                });
            });
    });
};

module.exports = { createUser, loginUser, updateUser, deleteUser, getAllUsers, getDetailsUser };
