var grpc = require('grpc')


function main(){

    var Server = new grpc.Server()


    Server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())

    Server.start()

    console.log("Started On : 127.0.0.1:50051")

}

main()