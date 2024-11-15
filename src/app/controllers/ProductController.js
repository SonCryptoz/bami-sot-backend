const ProductService = require("../../services/ProductService");

const createProduct = (req, res) => {
    const { name, image, type, quantity, price, discount, description } = req.body;

    if (!name || !image || !type || !price || !quantity) {
        return res.status(200).json({
            status: 'error',
            message: 'Vui lòng điền đầy đủ thông tin',
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

const deleteManyProduct = (req, res) => {
    const productIds = req.body.ids;

    if(!productIds){
        return res.status(200).json({
            status: 'error',
            message: 'The productIDs is required',
        });
    }

    ProductService.deleteManyProduct(productIds)
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
    ProductService.getAllProducts(Number(items), Number(pages || 0), sort, filter)
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

module.exports = { createProduct, updateProduct, deleteProduct, deleteManyProduct, getAllProducts ,getDetailsProduct };
