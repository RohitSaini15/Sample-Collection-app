const express = require("express")
const app = express()
require("dotenv").config()

const mongoose = require("./config/mongoose")
const passport = require("./config/passport-local-strategy")
const session = require("express-session")

const port = 8000

// convert the encoded data from browser into javascript object and attach in req.body
app.use(express.urlencoded({extended:true}))

// generate a session for a user and store it in a server side and attach session id to cookie 
app.use(session({
    name: "sample_collection",
    secret: process.env.SECRET_SESSION_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
}))

app.use(passport.initialize())
app.use(passport.session())

// all the routes with / will handled by this folder
app.use("/",require("./routes"))

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running at port: ${port}`);
})