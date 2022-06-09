let greets = require('../server/proto/greet_pb')
let service = require('../server/proto/greet_grpc_pb')

let calc = require('../server/proto/calculator_pb')
let CalculatorService = require('../server/proto/calculator_grpc_pb')

let grpc = require('grpc')

function callGreetService(){

    let client = new service.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    //we do stuff
    let greeting = new greets.Greeting()
    greeting.setFirstName("Jerry")
    greeting.setLastName("Tom")


    let request = new greets.GreetRequest()
    request.setGreeting(greeting)

    client.greet(request, (error, response) => {

        if(!error){
            console.log("Greeting Response: ", response.getResult())
        }else{
            console.log('ERROR: ', error)
        }
    })

}

function callCalculatorService(){

    let client = new CalculatorService.CalculatorServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    let sumRequest = new calc.SumRequest()
    sumRequest.setNum1(100)
    sumRequest.setNum2(500)

    client.sum(sumRequest, (error, response) => {

        if(!error){
            console.log("Sum: ", response.getSumResult())
        }else{
            console.log('ERROR: ', error)
        }
    })
}

function main(){

    //callGreetService()
    callCalculatorService()

}

main()