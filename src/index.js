"use strict"

const path = require("node:path"); // use an especific path to save time
const express = require("express"); // express library (nothing would work without this)
const fs = require('fs');
const multer = require("multer");

const login = require("./back js/pages/login.js");
const signup = require("./back js/pages/signup.js");
const search = require("./back js/pages/search.js");
const users = require("./back js/pages/users.js");
const product = require("./back js/pages/product.js");
const database = require("./back js/libraries/connect.js");

database.connect(e => {if (e) throw e;});
const app = express();

app.use(express.json()); // can interpret json
app.use(express.static(__dirname + "/front")); // front end files searching ease
app.use("/media", express.static(__dirname + '/sources'));

const upload = multer();

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
    let resMes = await search.main(req.body);

    res.send(resMes);
});

app.get("/usersAdmin", (req, res) => {
    res.sendFile(path.join(__dirname + "/front/html/users.html"));
});

app.post("/usersAdmin", async (req, res) => {
    let resMes = await users.main(req.body);

    res.send(resMes);
});

app.get("/creating", (req, res) => {
    res.sendFile(path.join(__dirname + "/front/html/addProduct.html"));
});

app.post("/creating", upload.any(), async (rem, res) => {
    let req = JSON.parse(rem.body.product);

    database.query(`insert into products(name, price, description, instrumenttype, filters, seller)
    values ("${req.name}", ${req.price}, "${req.description}", ${req.instrumentType}, "${req.filters}", "${req.seller}")`, async (e, resp) => {
        if (e) throw e;

        let origName = rem.files[0].originalname;
        const savePath = path.join(__dirname, 'sources/productImages', resp.insertId + "." + origName.split(".").pop());

        fs.writeFile(savePath, rem.files[0].buffer, (err) => {
            if (err) {
                res.send(["FE"]);
                throw err;
            }
            res.send([resp.insertId]);
        });
    }); 
});
        
app.get("/product", (req, res) => {
    res.sendFile(path.join(__dirname + "/front/html/product.html"));
});

app.post("/product", async (req, res) => {
    let resMes = await product.main(req.body);

    res.send(resMes);
});
