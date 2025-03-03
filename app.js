const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');  // Import session module

const User = require('./models/User');
const Booking = require('./models/booking'); // Import Booking model

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Use session middleware to track logged-in users
app.use(session({
  secret: 'your-secret-key',  // Change to a more secure key in production
  resave: false,
  saveUninitialized: true
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sports-safari').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.log(err));

// Signup route
app.post('/signup', async (req, res) => {
  console.log("Received Signup Data: ", req.body);
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords don't match.");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already in use.");
    }

    const user = new User({ email, password });
    await user.save();
    console.log("User successfully saved");
    res.redirect('/login.html');  // Redirect to login page after successful signup
  } catch (err) {
    console.error("Error occurred while signing up:", err);
    res.status(500).send("Error occurred while signing up.");
  }
});

// Login route (handles login and stores email in session)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).send("Invalid credentials");
    }

    // Store the email in the session
    req.session.userEmail = user.email;

    // Redirect to the logedin.html page after successful login
    res.redirect('/logedin.html');
  } catch (err) {
    res.status(500).send("Error logging in");
  }
});

// Booking Page Route
app.get('/booking', (req, res) => {
  if (!req.session.userEmail) {
    return res.redirect('/login'); // Redirect to login if not logged in
  }

  // Render the booking page and pass the user's email
  res.render('book', {
    userEmail: req.session.userEmail, // Pass the email to the template
    currentDate: new Date().toISOString().slice(0, 10) // Today's date (YYYY-MM-DD)
  });
});



// Confirm Booking Route (For saving the booking details)
app.post('/confirm-booking', async (req, res) => {
  const { ground, timeSlot, date } = req.body;
  
  if (!req.session.userEmail) {
    return res.status(400).send("User not logged in");
  }

  const newBooking = new Booking({
    ground,
    email: req.session.userEmail,
    timeSlot,
    date,
    createdAt: new Date()
  });

  try {
    await newBooking.save();
    console.log("Booking confirmed: ", newBooking);

    res.redirect('/logedIn.html'); // Redirect to your bookings page after successful booking
  } catch (err) {
    console.error("Error while saving booking:", err);
    res.status(500).send("Error while confirming booking");
  }
});

// My Bookings Page Route
app.get('/my-bookings', async (req, res) => {
  if (!req.session.userEmail) {
    return res.redirect('/login'); // If user isn't logged in, redirect to login page
  }

  try {
    // Find all bookings for the logged-in user
    const bookings = await Booking.find({ email: req.session.userEmail });

    // Render the 'my-bookings' page and pass the bookings data
    res.render('my-bookings', {
      userEmail: req.session.userEmail,
      bookings: bookings, // Pass all bookings for the logged-in user
    });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).send('Error fetching bookings.');
  }
});

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
