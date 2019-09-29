const path = require('path')
const http = require('http')
const express = require ('express')
const socketio = require('socket.io')
const Filter = require('bad-words')


const app = express()
const server = http.createServer(app)
const io = socketio(server)
const {Wit, log} = require('node-wit'); 
const client = new Wit({accessToken: 'QDG7EGGBQ4QZODIGW2YAYBZWTPRZVMKY'});

const port = process.env.PORT || 3000
const publicDirectoryPath =  path.join(__dirname,'/public')

app.use(express. static(publicDirectoryPath))

io.on('connection', (socket)=>{
    console.log('New Websocket connection')

    const welcome_msg='Hello, How may I help you today?\n'+
    'You know I can help if you have problem in using any of our services such as \n'+
    'Airtime,\n'+
    'Buy Data, \n'+
    'Bills, \n'+
   'Money Transfer, \n'+
    'Collections & Levies, \n'+
    'Buy Tickets ,\n'+
    'XpressWallet ,\n'+
    'Micro Pension';

   socket.emit('message',welcome_msg)

   
   socket.on('sendMessage', (message, callback) => {
    const filter = new Filter()

    if (filter.isProfane(message)) {
        return callback('Profanity is not allowed!')
    }

  socket.emit('sendMessage', message)
    callback()
})





    socket.on('botMessage',(message)=>{
        // to send to other users   io.emit('message',message)
        /*reply self or bot*/
    
    
        let kax = message.toLowerCase();
        let botresp;



        client.message(kax, {})
        .then((data) => {

            const responseSpeech = {
                resp_greetings: [
                  'am fine',
                  'am good',
                   'am cool'
                ],
                resp_exit: [
                  'take care ',
                  'bye',
                ],
                airtime: [
                    'Very easy,just register with your \n email ,password,debit card and start loading',
                    'All you need to do is to register with your \n email ,password,debit card and start loading',
                    
                  ],
                  internet_data: [
                    'Click on Buy Data on the menu bar, select the network data  you want to buy,select mode of payment then click pay',
                    'Login Navigate to Buy Data on the menu bar,select the type of data you want to pay for,select mode of payment then click pay',
                    
                  ],
                  bills_pay: [
                    'Click on the bills on the menu bar, select the bills you want to pay for,select mode of payment then click pay',
                    'Login Navigate to bills on the menu bar,select the bills you want to pay for,select mode of payment then click pay',
                    
                  ],
                  trans_fer: [
                    'Please we still on progress for easy money transfer from the tips of your fingers'
                    
                  ],
                  
                  col_lev: [
                    'Click on the Collections & Levies on the menu bar, select the Collections & Levies you want to pay for,select mode of payment then click pay',
                    
                  ],
                  buy_ticket: [
                    'Click on the buy ticket on the menu bar, select the ticket you want to pay for,select mode of payment then click pay',
                    
                  ],
                  xpress_wallet: [
                    'Please we still on progress ,xpress wallet would soon br available'
                  
                  ],
                  micro_pension: [
                    'Navigate to Micro Pension on the menu bar, select the service you want to pay for,select mode of payment then click pay',
                    
                  ],
                  contact_us: [
                    'If you need support  please contact: Email: customercare@xpresspayments.com Telephone: 01-6312430; +2348188866022'
                  ],
                  custom_help: [
                    'These are the list of things i can help you with,\n'+
                    'Airtime,\n'+
                    'Buy Data, \n'+
                    'Bills, \n'+
                   'Money Transfer, \n'+
                    'Collections & Levies, \n'+
                    'Buy Tickets ,\n'+
                    'XpressWallet ,\n'+
                    'Micro Pension'   
                ],
                none: [
                  'Sorry i dont understand that ?',
                  'Could you please come again',
                  'I did not get you',
                  'Please am not understanding'
                ],
              };
              

            function checkentity(data) {
            if(data.entities.hasOwnProperty('custom_greetings') === true){
                return 'custom_greetings';
            } else if(data.entities.hasOwnProperty('custom_exit') === true){
                 return 'custom_exit';
            } 
            else if(data.entities.hasOwnProperty('airtime') === true){
                return 'airtime';
           }  else if(data.entities.hasOwnProperty('internet_data') === true){
            return 'internet_data';
       } else if(data.entities.hasOwnProperty('bills_pay') === true){
        return 'bills_pay';
   } else if(data.entities.hasOwnProperty('trans_fer') === true){
    return 'trans_fer';
} 
else if(data.entities.hasOwnProperty('col_lev') === true){
    return 'col_lev';
} else if(data.entities.hasOwnProperty('buy_ticket') === true){
    return 'buy_ticket';
}    else if(data.entities.hasOwnProperty('xpress_wallet') === true){
    return 'xpress_wallet';
}        else if(data.entities.hasOwnProperty('micro_pension') === true){
    return 'micro_pension';
}       else if(data.entities.hasOwnProperty('contact_us') === true){
    return 'contact_us';
}      
else if(data.entities.hasOwnProperty('custom_help') === true){
    return 'custom_help';
}      
                else{
                return 'noentity';
            }    
            }

           const entitycheck = checkentity(data);
console.log('entity-check',typeof entitycheck);

            let resp;
            switch (entitycheck){
               
                case "custom_greetings":
                     resp = responseSpeech.resp_greetings;
                    botresp = resp[Math.floor(Math.random() * resp.length)];

                     break;
                case "custom_exit":
                     resp = responseSpeech.resp_exit;
                    botresp = resp[Math.floor(Math.random() * resp.length)];
                    break;
                    case "airtime":
                        resp = responseSpeech.airtime;
                       botresp = resp[Math.floor(Math.random() * resp.length)];

                   break;
                   case "internet_data":
                    resp = responseSpeech.internet_data;
                   botresp = resp[Math.floor(Math.random() * resp.length)];

               break;
               case "bills_pay":
                resp = responseSpeech.bills_pay;
               botresp = resp[Math.floor(Math.random() * resp.length)];

           break;
           case "trans_fer":
                resp = responseSpeech.trans_fer;
               botresp = resp[Math.floor(Math.random() * resp.length)];

           break;
           case "col_lev":
            resp = responseSpeech.col_lev;
           botresp = resp[Math.floor(Math.random() * resp.length)];

       break;
       case "buy_ticket":
        resp = responseSpeech.buy_ticket;
       botresp = resp[Math.floor(Math.random() * resp.length)];

   break;
   case "xpress_wallet":
        resp = responseSpeech.xpress_wallet;
       botresp = resp[Math.floor(Math.random() * resp.length)];

   break;
   case "micro_pension":
    resp = responseSpeech.micro_pension;
   botresp = resp[Math.floor(Math.random() * resp.length)];

break;        
case "contact_us":
    resp = responseSpeech.contact_us;
   botresp = resp[Math.floor(Math.random() * resp.length)];

break;  
case "custom_help":
    resp = responseSpeech.custom_help;
   botresp = resp[Math.floor(Math.random() * resp.length)];

break;          
   default:
                     resp = responseSpeech.none;
                    botresp = resp[Math.floor(Math.random() * resp.length)];
                     break;
              }
console.log(data);

        //let mx = 'Yay, got Wit.ai response: ' + JSON.stringify(data);
        
     //   x.entities.hasOwnProperty('custom_greetings') === true

          socket.emit('botMessage',botresp)
        
        
        })
        .catch(console.error)



      
    
     
        })

    })


server.listen(port,()=>{
    console.log(`Server is up on port ${port}!`)
})