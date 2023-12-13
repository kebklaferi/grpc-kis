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

const run = () => {
    try{
        const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
        const productService = protoDescriptor.ProductService;
        const client = new productService('0.0.0.0:50051', grpc.credentials.createInsecure());
        getProduct(client, 2)
    } catch (error) {

    }
}



function getProduct (client, id) {
    client.GetProduct({id: id}, (error, result) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function testConnection (client) {
    const request = { message: "Testing connection ..." };
    client.TestConnection(request, (error, result) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function getProducts (client) {
   const stream = client.GetProducts()
    stream.on("data", (chunk) => {
        console.log(chunk)
    })
    stream.on("end", () => {
        console.log("Stream data received.")
    })
}
run()