const Products = require('../models/productModel')
const { getPostData } = require('../utils')

// @desc    Get all products
//@route    GET api/products
async function getProducts(req, res) {
    try {
        const products = await Products.findAll()

        res.writeHead(200, {'content-type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Get a single product
//@route    GET api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Products.findById(id)
        
        if (!product){
            res.writeHead(404, {'content-type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a product
//@route    POST api/products/
async function createProduct(req, res) {
    try {
        const body = await getPostData(req)

        const {title, description, price} = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Products.create(product)

        res.writeHead(201, {'content-type': 'application/json'})
        res.end(JSON.stringify(newProduct))
        
    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a Single Product
//@route    PUT api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = Products.findById(id)

        if(!product) {
            res.writeHead(404, {'content-type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            const body = await getPostData(req)

            const {title, description, price} = JSON.parse(body)

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Products.update(id, productData)

            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify(updProduct))
        }
        
    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete a single product
//@route    DELETE api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Products.findById(id)
        
        if (!product){
            res.writeHead(404, {'content-type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            await Products.remove(id)
            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify({message: `Product ${id} removed`}))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}