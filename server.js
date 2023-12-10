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

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const product = protoDescriptor.ProductService;

function getServer() {
    const server = new grpc.Server();
    server.addService(product.service, {
        GetProduct: (req, res) => {
            console.log(req, res)
        },
        TestConnection: (req, res) => {
            console.log(req.request);
            res(null, {message: "Connection is working!"});
        }
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