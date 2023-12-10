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
const productService = protoDescriptor.ProductService;
const client = new productService('0.0.0.0:50051', grpc.credentials.createInsecure());

function getProducts () {
    client.GetProduct({id: 1}, (error, result) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function testConnection () {
    const request = { message: "Testing connection ..." };
    client.TestConnection(request, (error, result) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

testConnection()