const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generalAccessToken = (payload) => {
    const accessToken = jwt.sign(
        { payload },
        process.env.ACCESS_TOKEN,
        { expiresIn: "30s" }
    );
    return accessToken;
};

const generalRefreshToken = (payload) => {
    const refreshToken = jwt.sign(
        { payload },
        process.env.REFRESH_TOKEN,
        { expiresIn: "365d" }
    );
    return refreshToken;
};

const refreshTokenJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN, function (err, user) {
            if (err) {
                // Token không hợp lệ, reject với thông tin lỗi
                return reject({
                    status: "Error",
                    message: "Invalid refresh token",
                });
            }

            const { payload } = user;
            const access_token = generalAccessToken({
                id: payload?.id,
                isAdmin: payload?.isAdmin,
            });

            // Token hợp lệ, resolve với kết quả mới
            resolve({
                status: "OK",
                message: "Token is valid",
                access_token,
            });
        });
    });
};


module.exports = { generalAccessToken, generalRefreshToken, refreshTokenJWT };
