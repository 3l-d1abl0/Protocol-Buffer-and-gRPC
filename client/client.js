let greets = require('../server/proto/greet_pb')
let service = require('../server/proto/greet_grpc_pb')

let grpc = require('grpc')

function main(){

    console.log('Hello from Client')

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

main()