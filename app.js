const express=require("express");
const bodyparser=require("body-parser");
const  mongoose = require("mongoose");
const date=require(__dirname+"/date.js");
const app=express();

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

var items=["buy food", "Cook food", "Eat food"];
var workItems=[];

mongoose.connect('mongodb://127.0.0.1:27017/todolist', {useNewUrlParser: true});

const itemSchema=new mongoose.Schema({
    name: String
});

const Item=mongoose.model("item", itemSchema);

const item1=new Item({
    name:"sjhk"
});

const item2=new Item({
    name:"sjhw"
});
const item3=new Item({
    name:"sjhk"
});

const defaultItems=[item1, item2, item3];



app.get('/',function(req,res){

    Item.find({},function(err,result){
        if(result.length==0){
           Item.insertMany(defaultItems,function(err){
              if(err){
               console.log(err);
               }
               else{
                  console.log("added sucessfully");
                 }
                })
                res.redirect('/');
        }
 
        else{
    
            res.render("list", {listTitle:"Today",items:result});
            
        }
        
    })
    
    

});


app.get("/work", function(req,res){

    Item.find({},function(err,result){
        if(err){
            console.log("error fetching data from database");
        }
        else{
    
            
        }
        
    })

    res.render("list",{listTitle:"work list",items:workItems});

});

app.get("/about", function(req,res){

    res.render("about");


});


app.post("/", function(req,res){
    var item=req.body.newItem;
    if(req.body.list === "work"){
       workItems.push(item);
       res.redirect("/work");

    }

    else{

        const itemm=new Item({
            name:item
        });

      itemm.save();

        res.redirect("/");
    }



});












app.listen('3000',function(){

console.log("App is listening on port 3000");

});