
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-gokay:test@cluster0-9lbz6.mongodb.net/dndcitiesDB", {useNewUrlParser: true, useUnifiedTopology: true})

const citiesSchema = new mongoose.Schema({
  name: String,
  description: String
})

const City = mongoose.model("City", citiesSchema)


app.get("/", function(req, res){
  res.render("main")
})

app.get("/north-east", function(req, res){
  res.render("map")
})

app.get("/:cityName", function(req, res){

  //create const with req.params and use lodash method to make the string lowercase
  //create a const. pass in parameter and apply lodash lowercase method
  //use findOne method to find the city name and render it

  City.findOne({ name: req.params.cityName }, function (err, cityFound) {
    if (!err){
      if (cityFound) {
        res.render("city-description", {title: cityFound.name, description: cityFound.description})
      }
    } else {
      console.log(err);
    }

  });
  //pass the parameters to ejs template and display the city information
  //res.render("city-description", {title: cityFound.title, description: cityFound.description})
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(err){
  console.log("Server has started");
})
