var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://iot.eclipse.org')
var express=require('express');
var app=express();
var bodyParser =require('body-parser')

var mongojs = require('mongojs')
var db = mongojs("mongodb://datasoft:1234@ds125335.mlab.com:25335/datasoft", ['datasoft']);



/* JESON format for postman
var data = {
   
    "Device": "DS000",
    "Methane": "0.989"
}*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//MQTT protocal
client.on('connect', function () {
    client.subscribe('arun')
    client.publish('arun', 'Arun Biswas')
  })
   
     client.on('message', function (topic, message) {
         
          console.log(message.toString())
  
          saveObject = {
              "msg": message.toString()
             
          }
         
          db.datasoft.save(saveObject)
          
         // client.end()
        })

//...............................


//get function
app.get('/',(req,res)=>{

    db.datasoft.find(function(err,docs){
        
    res.send(docs)}) 
})

//response from Temperature
app.get('/Temp',(req,res)=>{

    res.send('Temp');
})

//response from Sound
app.get('/Sound',(req,res)=>{
    res.send('Sound');
})

//response from Light
app.get('/Light',(req,res)=>{
    res.send('Light');
})

//save data on database
app.post('/data',(req,res)=>{

    //console.log(req);
    //console.log(res.body.toString());
    var data=res.body;
    console.log(String(data));
    db.datasoft.save(req.body);
    res.json(req.body);
    console.log("Data Posted");
   
})


app.listen(3000,()=>{

    console.log('Server is running');
})