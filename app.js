var express = require('express');
var app = express();
var request = require('request');  
var bodyParser = require("body-parser");
app.set("view engine","ejs"); 
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    request("http://www.omdbapi.com/?s="+query+"&apikey=b7124242", function(error , response, body){
        if(!error && response.statusCode == 200)
        {
            var data = JSON.parse(body);
            res.render("results",{data: data});
            // res.send(data);
        }
    });
});

app.listen(3001 , process.env.IP, function(){
    console.log("Movie App is listening...!!");
});