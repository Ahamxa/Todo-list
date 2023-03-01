const express=require("express");
const bodyparser=require("body-parser");
const  mongoose = require("mongoose");
const date=require(__dirname+"/date.js");
const app=express();

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

var items=["buy food", "Cook food", "Eat food"];
var workItems=["a","b","c"];



const day=date.getDate();

app.get('/',function(req,res){

    res.render("list",{listTitle:day, listItems:items});
    
})

app.post("/",function(req,res){

   items.push(req.body.newItem);

   res.redirect('/');

});

app.get("/about",function(req,res){

    res.render("about");
    
});






















app.listen('3000',function(){

console.log("App is listening on port 3000");

});