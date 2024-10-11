const Product = require("../app/models/ProductModel");

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

const updateProduct = (id, data) => {
    return new Promise((resolve, reject) => {
        Product.findOne({ _id: id })
            .then((checkProduct) => {
                if (!checkProduct) {
                    return resolve({
                        status: "error",
                        message: "Product does not exist",
                    });
                }

                // Cập nhật sản phẩm và trả về phiên bản mới
                return Product.findByIdAndUpdate(id, data, { new: true });
            })
            .then((updatedProduct) => {
                if (!updatedProduct) {
                    return resolve({
                        status: "error",
                        message: "Failed to update product",
                    });
                }

                resolve({
                    status: "success",
                    message: "Product updated successfully",
                    data: updatedProduct,
                });
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "An error occurred while updating product",
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
                        message: "Product does not exist",
                    });
                }

                // Xóa sản phẩm
                return Product.findByIdAndDelete(id);
            })
            .then((deletedProduct) => {
                if (!deletedProduct) {
                    return resolve({
                        status: "error",
                        message: "Failed to delete product",
                    });
                }

                resolve({
                    status: "success",
                    message: "Product deleted successfully",
                });
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "An error occurred while deleting product",
                    error: err,
                });
            });
    });
};

const getAllProducts = (items, pages, sort, filter) => {
    return new Promise((resolve, reject) => {
        let totalProducts; 
        Product.countDocuments()
            .then((products) => {
                totalProducts = products;
                if(sort){
                    const objectSort = {};
                    objectSort[sort[1]] = sort[0]; 
                    return Product.find().limit(items).skip(pages * items).sort(objectSort);
                }
                if(filter){
                    const label = filter[0];
                    return Product.find({
                        [label]: {
                            "$regex": filter[1],
                        },
                    }).limit(items).skip(pages * items);
                }
                return Product.find().limit(items).skip(pages * items);
            })
            .then((checkProduct) => {
                if (!checkProduct) {
                    return resolve({
                        status: "error",
                        message: "Product does not exist",
                    });
                }
                else{
                    return resolve({
                        status: "success",
                        message: "All products",
                        data: checkProduct,
                        total: totalProducts,
                        currentPage: pages + 1,
                        totalPages: Math.ceil(totalProducts / items),
                    });
                }
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "An error occurred while rendering all products",
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
                        message: "Product does not exist",
                    });
                }
                else{
                    return resolve({
                        status: "success",
                        message: "Product details",
                        data: checkProduct,
                    });
                }
            })
            .catch((err) => {
                reject({
                    status: "error",
                    message: "An error occurred while rendering product details",
                    error: err,
                });
            });
    });
};

module.exports = { createProduct, updateProduct, deleteProduct, getAllProducts ,getDetailsProduct };
