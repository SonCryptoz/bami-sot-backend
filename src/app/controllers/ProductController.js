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

const updateProduct = (req, res) => {
    const productId = req.params.id;
    const data = req.body;

    if(!productId){
        return res.status(200).json({
            status: 'error',
            message: 'The productID is required',
        });
    }

    ProductService.updateProduct(productId, data)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(e => {
            return res.status(404).json({
                message: e,
            });
        });
};

const deleteProduct = (req, res) => {
    const productId = req.params.id;

    if(!productId){
        return res.status(200).json({
            status: 'error',
            message: 'The productID is required',
        });
    }

    ProductService.deleteProduct(productId)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(e => {
            return res.status(404).json({
                message: e,
            });
        });
};

const getAllProducts = (req, res) => {
    const { items, pages, sort, filter } = req.query;
    ProductService.getAllProducts(Number(items || 6), Number(pages || 0), sort, filter)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(e => {
            return res.status(404).json({
                message: e,
            });
        });
};

const getDetailsProduct = (req, res) => {
    const productId = req.params.id;

    if(!productId){
        return res.status(200).json({
            status: 'error',
            message: 'The productID is required',
        });
    }

    ProductService.getDetailsProduct(productId)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(e => {
            return res.status(404).json({
                message: e,
            });
        });
};

module.exports = { createProduct, updateProduct, deleteProduct, getAllProducts ,getDetailsProduct };
