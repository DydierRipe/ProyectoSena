"use strict"

const path = require("node:path"); // use an especific path to save time
const express = require("express"); // express library (nothing would work without this)

const login = require("./back js/pages/login.js");
const signup = require("./back js/pages/signup.js");
const search = require("./back js/pages/search.js");
const database = require("./back js/libraries/connect.js");

database.connect(e => {if (e) throw e;});
const app = express();

app.use(express.json()); // can interpret json
app.use(express.static(__dirname + "/front")); // front end files searching ease
app.use("/media", express.static(__dirname + '/sources'));

app.listen(3000, () => { 
    console.log("server is working");
});

app.get("", (req, res) => {
    res.sendFile(path.join(__dirname + "/front/html/index.html"))
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname + "/front/html/login.html"));
});

/*
    response Types: 
        N: the user doesn't exists, try with a registered user or sign up with your account
        NC: the user exists and the password is correct, can log in
        NI: the user exists but the password is incorrect, try with other password
*/

app.post("/login", async (req, res) => {
    let resMes = await login.main(req);
    
    res.send(resMes);
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname + "/front/html/signup.html"));
});

/*
    response Types: 
        E: the email is already registered
        FE: file error, the email can be registered (not exist in the database) but there was an error in the database writing system, try again later
        EmS: email sended
*/ 

app.post("/signup", async (req, res) => {
    let resMes = await signup.main(req.body);

    res.send(resMes);
});

app.get("/search", (req, res) => {
    res.sendFile(path.join(__dirname + "/front/html/search.html"));
});

app.post("/search", async (req, res) => {
    let resMes = await search.main(req.body.search);

    res.send(resMes);
})
