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
            alias: "testni-produkt-2",
            title: "Testni produkt 2",
            brand: 4,
            category: 4,
        }
        await createProduct(client, tmp)

    } catch (error) {
        console.error(error)
    }
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