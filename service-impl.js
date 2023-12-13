const knex = require("./database-connection/db")
/*  PRODUCTS  */
const getProduct = async (req, res) => {
    const {id} = req.request;
    const product = await knex("product").where({id: id}).first();
    console.log(product)
    res(null, {
        id: product.id,
        alias: product.alias,
        title: product.title,
        brand: product.brand,
        category: product.category
    })
}
const createProduct = (req, res) => {

}
const deleteProduct = (req, res) => {

}
const updateProduct = (req, res) => {


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
            console.error("Error: " + error);
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