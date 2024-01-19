const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0/appdbs', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Create a schema for the user information
const userSchema = new mongoose.Schema({
  username: String,
dob: String,
age: Number,
gender: String,
email: String,
password: String
  
  
});

const User = mongoose.model('User', userSchema);

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle POST requests to the signup page
app.post('/signup', (req, res) => {
  const { username,dob,age,gender, email, password } = req.body;

  // Check if the user already exists in the database
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      res.status(500).send('Error checking for existing user');
    } else if (existingUser) {
      res.status(400).send('User already exists');
    } else {
      // Create a new user and save it to the database
      const newUser = new User({
        username,
        dob,
        age,
        gender,
        email,
        password
      });

      newUser.save((err) => {
        if (err) {
          res.status(500).send('Error saving user');
        } else {
          res.status(200).send('User signed up successfully');
        }
      });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});



