
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require ("md5");


const app = express();

 
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/myapp');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", async function (req, res) { 

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

    const newUser = new User({
      email: req.body.username,
      password:hash
    });
  
    try {
       newUser.save();
      res.render("secrets");
    } catch (err) {
      console.log(err);
    }
  });

});

app.post("/login", async function (req, res) { 
  const username = req.body.username;
  const password = req.body.password;
  try {
    const foundUser = await User.findOne({ email: username });
    bcrypt.compare(password, foundUser.password , function(err, result) {
      if(result  === true){
        res.render("secrets");
      }
  });git 
      
   
  } catch (err) {
    console.log(err);
  }
});


app.listen(3000, function(){
    console.log('server started on port 3000');

})


