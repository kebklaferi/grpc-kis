const PROTO_PATH = __dirname + '/details.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const run = async () => {
    try {
        const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
        const productService = protoDescriptor.ProductService;
        const client = new productService('0.0.0.0:50051', grpc.credentials.createInsecure());
        const tmp = {
            id: 8,
            alias: "updated-produkt",
            title: "updated produkt",
            brand: 3,
            category: 4,
        }
        const ing = {
            id: 6,
            alias: "update-sestavina-4",
            title: "Update sestavina 4",
            description: "opis",
            acne_fighting: 0,
            comedogenic_rating: 1
        }
        await getIngredients(client)

    } catch (error) {
        console.error(error)
    }
}
function deleteIngredient(client, id){
    client.DeleteIngredient({id: id}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
    });
}
function getIngredients(client){
    const stream = client.GetIngredients();
    stream.on("data", (chunk) => {
        console.log(chunk)
    })
    stream.on("end", () => {
        console.log("Stream data received.")
    })
}
function updateIngredient(client, ingredient){
    client.UpdateIngredient(ingredient, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
    });
}
function createIngredient(client, ingredient){
    client.CreateIngredient(ingredient, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
    });
}
function getIngredient(client, id){
    client.GetIngredient({id: id}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function getProductCategory(client, id) {
    client.GetProductCategory({id: id}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function getProductBrand(client, id) {
    client.GetProductBrand({id: id}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function updateProduct(client, product) {
    client.UpdateProduct(product, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function deleteProduct(client, id) {
    client.DeleteProduct({id: id}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
    });
}

async function getProduct(client, id) {
    try {
        const result = await client.GetProduct({id: id});
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

function createProduct(client, product) {
    const request = {
        alias: product.alias,
        title: product.title,
        brand: product.brand,
        category: product.category,
    };
    client.CreateProduct(request, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
    });
}

function testConnection(client) {
    const request = {message: "Testing connection ..."};
    client.TestConnection(request, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function getProducts(client) {
    const stream = client.GetProducts();
    stream.on("data", (chunk) => {
        console.log(chunk)
    })
    stream.on("end", () => {
        console.log("Stream data received.")
    })
}

run().then(data => {
    console.log("end")
})