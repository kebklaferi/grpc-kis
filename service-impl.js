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
                message: delRows + " row(s) affected.",
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
    const {alias, title, brand, category, id} = req.request;
    try {
        const exists = await knex("product").where({id: id}).first();
        if (!exists) {
            res({
                code: grpc.status.NOT_FOUND,
                details: "Resource does not exist."
            })
        } else {
            const result = await knex("product").where({id: id})
                .update({
                    alias: alias,
                    title: title,
                    brand_id: brand,
                    category_id: category,
                })
            res(null, {
                message: result + " row(s) affected.",
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
const getIngredient = async (req, res) => {
    const {id} = req.request;
    try {
        const ingredient = await knex("ingredient").where({id: id}).first();
        res(null, {
            id: ingredient.id,
            title: ingredient.title,
            alias: ingredient.alias,
            description: ingredient.description,
            acne_fighting: ingredient.acne_fighting,
            comedogenic_rating: ingredient.comedogenic_rating
        })
    } catch (error) {
        console.error("Error:", error);
        res({
            code: grpc.status.INTERNAL,
            details: "Internal Server Error"
        });
    }
}
const createIngredient = async (req, res) => {
    const {alias, title, description, acne_fighting, comedogenic_rating} = req.request;
    try {
        const id = await knex("ingredient").insert({
            alias: alias,
            title: title,
            description: description,
            acne_fighting: acne_fighting,
            comedogenic_rating: comedogenic_rating,
        })
        res(null, {
            message: "Successfully created ingredient with id " + id,
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
const deleteIngredient = async (req, res) => {
    const {id} = req.request
    try {
        const exists = await knex("ingredient").where({id: id}).first();
        if (!exists) {
            res({
                code: grpc.status.NOT_FOUND,
                details: "Resource does not exist."
            })
        } else {
            const delRows = await knex("ingredient").where({id: id}).del();
            res(null, {
                message: delRows + " row(s) affected.",
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
const updateIngredient = async (req, res) => {
    const {alias, title, description, acne_fighting, comedogenic_rating, id} = req.request;
    try {
        const exists = await knex("ingredient").where({id: id}).first();
        if (!exists) {
            res({
                code: grpc.status.NOT_FOUND,
                details: "Resource does not exist."
            })
        } else {
            const result = await knex("ingredient").where({id: id})
                .update({
                    alias: alias,
                    title: title,
                    description: description,
                    acne_fighting: acne_fighting,
                    comedogenic_rating: comedogenic_rating,
                })
            res(null, {
                message: result + " row(s) affected.",
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
const getIngredients = (call) => {
    knex.select("*")
        .from("ingredient")
        .then((ingredients) => {
            for (let ingredient of ingredients) {
                console.log(ingredient)
                call.write(ingredient)
            }
            call.end();
            console.log("Done streaming data.")
        })
        .catch(error => {
            console.error("Error:", error);
        })
}

const getProductCategory = async (req, res) => {
    const {id} = req.request
    try {
        const exists = await knex("product").where({id: id}).first();
        if (!exists) {
            res({
                code: grpc.status.NOT_FOUND,
                details: "Resource does not exist."
            })
        } else {
            const categoryId = await knex("product").select("category_id").where({id: id}).first();
            const categoryDetails = await knex("category").where({id: categoryId.category_id}).first();
            res(null, {
                id: categoryDetails.id,
                alias: categoryDetails.alias,
                title: categoryDetails.title
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

const getProductBrand = async (req, res) => {
    const {id} = req.request
    try {
        const exists = await knex("product").where({id: id}).first();
        if (!exists) {
            res({
                code: grpc.status.NOT_FOUND,
                details: "Resource does not exist."
            })
        } else {
            const brandId = await knex("product").select("brand_id").where({id: id}).first();
            const brandDetails = await knex("brand").where({id: brandId.brand_id}).first();
            res(null, {
                id: brandDetails.id,
                alias: brandDetails.alias,
                title: brandDetails.title
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