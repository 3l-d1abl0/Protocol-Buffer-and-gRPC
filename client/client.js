var grpc = require('grpc')

var services = require('../server/proto/dummy_grpc_pb')



function main(){

    console.log('Hello from Client')

    var client = new services.DummyServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    //we do stuff
    console.log("client: ",client);


}

main()