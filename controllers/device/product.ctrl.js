const productModel = require('../../models/products.model');

exports.addProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        await productModel.create({
            name, price, userId: req.token.id
        });
        res.json({ message: "Product Added!", data: 1 });
    } catch (err) {
        res.status(500).json({ message: err.message, data: 0 });
    }
}


exports.getProducts = async (req, res) => {
    try {
        let { search } = req.body;
        search = new RegExp(search, "i");
        let results = await productModel.find({ 
            $or: [{name: search }],
            userId: req.token.id
        });
        res.json({ message: "Results!", data: results });
    } catch (err) {
        res.status(500).json({ message: err.message, data: 0 });
    }
}

