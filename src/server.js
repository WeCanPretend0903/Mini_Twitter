const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./mongodb");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'src', 'components'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.static("public"));

app.get('/login', (req, res) => {
  res.render("Login");
});

app.get('/signup', (req, res) => {
  res.render("SignUp");
});

app.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    };

    const result = await collection.insertMany(userData);
    console.log(userData);

    res.send('Signup successful'); // or redirect to another page
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
