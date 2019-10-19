// path if you wanna allow to retrieve images from your front(etc)
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// log information
const morgan = require("morgan");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
app.use(morgan("dev"));

mongoose.connect('mongodb+srv://Nurtylek:AI8B8oe2AnGu4CYZ@node-angular-rdwny.mongodb.net/mean?retryWrites=true&w=majority',
    { useNewUrlParser: true } )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// to allow images(folder) we need to add, to retrieve
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});


// Routes which should handle requests
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

// handle errors if it is incorrect request
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;
