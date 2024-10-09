const Product = require("../app/models/ProductModel");
const bcrypt = require("bcrypt");

const createProduct = (newProduct) => {
    return new Promise((resolve, reject) => {
        const { name, image, type, price, quantity, description } = newProduct;

        Product.findOne({ name: name })
            .then((checkProduct) => {
                if (checkProduct) {
                    return resolve({
                        status: "error",
                        message: "Product name is already in use",
                    });
                }

                return Product.create({
                    name,
                    image,
                    type,
                    price,
                    quantity,
                    description,
                });
            })
            .then((createdProduct) => {
                if (createdProduct) {
                    resolve({
                        status: "success",
                        message: "Product created successfully",
                        data: createdProduct,
                    });
                }
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "An error occurred while creating product",
                    error: err,
                });
            });
    });
};

module.exports = { createProduct };
