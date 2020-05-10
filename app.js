
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

const arkatka = new City ({
  name: "Arkatha",
  description: "The capital city of Arkaddha, centrally located coastal city. Seat of the Jewelled Throne, the throne of the Queen of Arkaddha"
})

//arkatka.save()

// const cityInfo = [
//   {
//     title: "Arkaddha",
//     description: "The coastal desert kingdom of Arkaddha stood firm against the Ardorian Empire for many years thanks to its alliance with the dragons of the desert. However after much conflict the dragons grew tired, bored and sad because of the ongoing conflict (including the loss of several dragons) so when Ardor was destroyed the dragons retreated to their caves, mountains, libraries etc. Now the people of Arkaddha must continue on without their ancestral guardians, there is now growing restlessness and the leaders of Arkad are trying to show that they are still strong without the dragons."
//   },
//   {
//     title: "Arkatka",
//     description: "jkhkjflksdjhaf;slkdhjf;sdljf;djsa;jsd"
//   }]



app.get("/", function(req, res){
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
