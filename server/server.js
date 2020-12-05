//Server
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const ora = require('ora');
const passport = require('passport');

//Server routes
const userSetup = require('./routes/users');

//Initialize
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

//Routes
app.use('/users', userSetup);

//Start Server
app.listen(PORT, () => {
    ora(`Server running on port ${PORT}`).start();
});
