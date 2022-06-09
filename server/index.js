var greets = require('../server/proto/greet_pb')
var service = require('../server/proto/greet_grpc_pb')

let calc = require('../server/proto/calculator_pb')
let CalculatorService = require('../server/proto/calculator_grpc_pb')

var grpc = require('grpc')

/*
    Implements the greet RPC method.
*/
function greet(call, callback){

    var greeting = new greets.GreetResponse()

    greeting.setResult(
        "Hello "+call.request.getGreeting().getLastName()+'\n'
        +call.request.getGreeting().getFirstName()+' '+call.request.getGreeting().getLastName()
    )

    callback(null, greeting)
}

function sum(call, callback){

    let sumResponse = new calc.SumResponse()

    sumResponse.setSumResult(
        call.request.getNum1()+call.request.getNum2()
    )

    callback(null, sumResponse)
}


function main(){

    var Server = new grpc.Server()

    Server.addService(service.GreetServiceService, {greet: greet})

    Server.addService(CalculatorService.CalculatorServiceService, {sum: sum})

    Server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())

    Server.start()

    console.log("Started On : 127.0.0.1:50051")

}

main()