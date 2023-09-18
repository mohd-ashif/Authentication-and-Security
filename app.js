require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const bcrypt = require('bcryptjs');
const User = require('./models/userModel.js')
const dbConnect = require('./config/db.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.set('view engine', 'ejs');

dbConnect();

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", async (req, res) => { 

  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hashSync(password, 10);
  
    try {

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword
    });

      await newUser.save();

      res.render("secrets");

    } catch (err) {
      console.log(err);
    }

});

app.post("/login", async function (req, res) { 
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email: email });

    await bcrypt.compareSync(password, foundUser.password);

    res.render("secrets");

  } catch (error) {
    console.log('error',error);
  }
});


app.listen(process.env.PORT, function(){
    console.log(`server started on port: ${process.env.PORT}`);
})


