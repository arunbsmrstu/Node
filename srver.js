var express=require('express');
var app=express();

var mongojs = require('mongojs')
var db = mongojs("mongodb://datasoft:1234@ds125335.mlab.com:25335/datasoft", ['datasoft']);

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

app.listen(3000,()=>{

    console.log('Server is running');
})