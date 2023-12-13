const PROTO_PATH = __dirname + '/details.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const {
    getProduct, createProduct, deleteProduct, updateProduct, getProducts,
    getIngredient, createIngredient, deleteIngredient, updateIngredient, getIngredients, getProductCategory, getProductBrand
} = require("./service-impl");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const product = protoDescriptor.ProductService;

function getServer() {
    const server = new grpc.Server();
    server.addService(product.service, {
        TestConnection: (req, res) => {
            console.log(req.request);
            res(null, {
                message: "Connection is working!"
            });
        },
        GetProduct: getProduct,
        CreateProduct: createProduct,
        GetProducts: getProducts,
        DeleteProduct: deleteProduct,
        UpdateProduct: updateProduct,
        GetIngredient: getIngredient,
        CreateIngredient: createIngredient,
        DeleteIngredient: deleteIngredient,
        UpdateIngredient: updateIngredient,
        GetIngredients: getIngredients,
        GetProductBrand: getProductBrand,
        GetProductCategory: getProductCategory
    });
    return server;
}

const productServer = getServer();

productServer.bindAsync('0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log("Server is listening on port " + port)
        productServer.start();
    });