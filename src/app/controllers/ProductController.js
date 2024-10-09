const ProductService = require("../../services/ProductService");

const createProduct = (req, res) => {
    const { name, image, type, price, quantity, description } = req.body;

    if (!name || !image || !type || !price || !quantity) {
        return res.status(200).json({
            status: 'error',
            message: 'The input is required',
        });
    } 

    ProductService.createProduct(req.body)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(e => {
            return res.status(404).json({
                message: e,
            });
        });
};

module.exports = { createProduct };
