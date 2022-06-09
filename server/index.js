var greets = require('../server/proto/greet_pb')
var service = require('../server/proto/greet_grpc_pb')


var grpc = require('grpc')

/*
    Implements the great RPC method.
*/
function greet(call, callback){

    var greeting = new greets.GreetResponse()

    greeting.setResult(
        "Hello "+call.request.getGreeting().getFirstName()
    )

    callback(null, greeting)
}


function main(){

    var Server = new grpc.Server()

    Server.addService(service.GreetServiceService, {greet: greet})

    Server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())

    Server.start()

    console.log("Started On : 127.0.0.1:50051")

}

main()