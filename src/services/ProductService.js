const Product = require("../app/models/ProductModel");
const mongoose = require('mongoose');

const createProduct = (newProduct) => {
    return new Promise((resolve, reject) => {
        const { name, image, type, quantity, price, discount, description } = newProduct;

        Product.findOne({ name: name })
            .then((checkProduct) => { 
                if (checkProduct) {
                    return resolve({
                        status: "error",
                        message: "Tên sản phẩm đã được sử dụng!",
                    });
                }

                return Product.create({
                    name,
                    image,
                    type,
                    quantity,
                    price,
                    discount,
                    description,
                });
            })
            .then((createdProduct) => {
                if (createdProduct) {
                    resolve({
                        status: "success",
                        message: "Tạo sản phẩm thành công!",
                        data: createdProduct,
                    });
                }
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "Có lỗi xảy ra khi tạo sản phẩm!",
                    error: err,
                });
            });
    });
};

const updateProduct = (id, data) => {
    return new Promise((resolve, reject) => {
        Product.findOne({ _id: id })
            .then((checkProduct) => {
                if (!checkProduct) {
                    return resolve({
                        status: "error",
                        message: "Sản phẩm không tồn tại",
                    });
                }

                // Cập nhật sản phẩm và trả về phiên bản mới
                return Product.findByIdAndUpdate(id, data, { new: true });
            })
            .then((updatedProduct) => { 
                if (!updatedProduct) {
                    return resolve({
                        status: "error",
                        message: "Cập nhật sản phẩm không thành công",
                    });
                }

                resolve({
                    status: "success",
                    message: "Cập nhật sản phẩm thành công",
                    data: updatedProduct,
                });
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "Đã xảy ra lỗi khi cập nhật sản phẩm",
                    error: err,
                });
            });
    });
};

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        Product.findOne({ _id: id })
            .then((checkProduct) => {
                if (!checkProduct) {
                    return resolve({
                        status: "error",
                        message: "Sản phẩm không tồn tại!",
                    });
                }

                // Xóa sản phẩm
                return Product.findByIdAndDelete(id);
            })
            .then((deletedProduct) => {
                if (!deletedProduct) {
                    return resolve({
                        status: "error",
                        message: "Xóa sản phẩm không thành công!",
                    });
                }

                resolve({
                    status: "success",
                    message: "Xóa sản phẩm thành công",
                });
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "Có lỗi xảy ra khi xóa sản phẩm!",
                    error: err,
                });
            });
    });
};

const getAllProducts = (items, pages, sort, filter) => {
    return new Promise((resolve, reject) => {
        // Tạo truy vấn tìm kiếm sản phẩm dựa trên bộ lọc
        const query = filter ? { [filter[0]]: { "$regex": filter[1], "$options": "i" } } : {};

        // Tạo đối tượng sắp xếp nếu có
        const sortOption = sort ? { [sort[1]]: sort[0] } : {};

        Product.countDocuments(query)
            .then((totalProducts) => {
                if (totalProducts === 0) {
                    return resolve({
                        status: "error",
                        message: "Không có sản phẩm nào phù hợp với bộ lọc",
                        total: 0,
                        currentPage: 0,
                        totalPages: 0,
                    });
                }

                return Product.find(query)
                    .limit(items)
                    .skip(pages * items)
                    .sort(sortOption)
                    .then((products) => {
                        return resolve({
                            status: "success",
                            message: "Tất cả sản phẩm",
                            data: products,
                            total: totalProducts,
                            currentPage: pages + 1,
                            totalPages: Math.ceil(totalProducts / items),
                        });
                    });
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "Có lỗi xảy ra khi hiển thị dữ liệu sản phẩm",
                    error: err,
                });
            });
    });
};


const getDetailsProduct = (id) => {
    return new Promise((resolve, reject) => {
        Product.findOne({ _id: id })
            .then((checkProduct) => {
                if (!checkProduct) {
                    return resolve({
                        status: "error",
                        message: "Sản phẩm không tồn tại",
                    });
                }
                else{
                    return resolve({
                        status: "success",
                        message: "Chi tiết sản phẩm",
                        data: checkProduct,
                    });
                }
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "Có lỗi xảy ra khi hiển thị dữ liệu chi tiết sản phẩm",
                    error: err,
                });
            });
    });
};

module.exports = { createProduct, updateProduct, deleteProduct, getAllProducts ,getDetailsProduct };
