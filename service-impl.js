const knex = require("./database-connection/db")
const grpc = require('@grpc/grpc-js');
/*  PRODUCTS  */
const getProduct = async (req, res) => {
    const {id} = req.request;
    try {
        const product = await knex("product").where({id: id}).first();
        console.log(product)
        res(null, {
            id: product.id,
            alias: product.alias,
            title: product.title,
            brand: product.brand,
            category: product.category
        })
    } catch (error) {
        console.error("Error:", error);
        res({
            code: grpc.status.INTERNAL,
            details: "Internal Server Error"
        });
    }

}
const createProduct = async (req, res) => {
    const {alias, title, brand, category} = req.request;
    try {
        const id = await knex("product").insert({
            alias: alias,
            title: title,
            brand_id: brand,
            category_id: category,
        })
        res(null, {
            message: "Successfully created product with id " + id,
            status: grpc.status.OK
        })
    } catch (error) {
        console.error("Error:", error);
        res({
            code: grpc.status.INTERNAL,
            details: "Internal Server Error"
        });
    }
}
const deleteProduct = async (req, res) => {
    const {id} = req.request
    try {
        const exists = await knex("product").where({id: id}).first();
        if (!exists) {
            res({
                code: grpc.status.NOT_FOUND,
                details: "Resource does not exist."
            })
        } else {
            const delRows = await knex("product").where({id: id}).del();
            res(null, {
                message: delRows + "row(s) affected.",
                status: grpc.status.OK
            })
        }
    } catch (error) {
        console.error("Error:", error);
        res({
            code: grpc.status.INTERNAL,
            details: "Internal Server Error"
        });
    }
}
const updateProduct = async (req, res) => {

}
    const getProducts = (call) => {
        knex.select("*")
            .from("product")
            .then((products) => {
                for (let product of products) {
                    console.log(product)
                    call.write(product)
                }
                call.end();
                console.log("Done streaming data.")
            })
            .catch(error => {
                console.error("Error:", error);
            })
    }

    /*  INGREDIENTS  */
    const getIngredient = (req, res) => {

    }
    const createIngredient = (req, res) => {

    }
    const deleteIngredient = (req, res) => {

    }
    const updateIngredient = (req, res) => {

    }
    const getIngredients = (call) => {

    }

    const getProductCategory = () => {

    }

    const getProductBrand = () => {

    }


    module.exports = {
        getProduct,
        deleteProduct,
        updateProduct,
        createProduct,
        getProducts,
        getIngredient,
        deleteIngredient,
        updateIngredient,
        createIngredient,
        getIngredients,
        getProductBrand,
        getProductCategory
    }