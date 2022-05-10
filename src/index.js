"use strict"

const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const algorithm = require("./back js/algorithms.js");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/front"))

app.listen(3000, () => {
    console.log("server is working");
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname + "/front/html/login.html"));
});

const returnExistence = req => {
    return new Promise((res, rej) => {
        fs.readFile(__dirname + "/files/users.JSON", (err, data) => {
            if (err)
            {
                rej(err);
            } 
            else {
                const exist = algorithm.searching(JSON.parse(data.toString()), req.body.email, "email");
    
                if (!exist) {
                    res("N");
                }
                else {
                    if (exist.password == req.body.password)
                    {
                        res("NC");
                    }
                    else {
                        res("NI"); 
                    }
                }
            }
        });
    })
}

app.post("/login", async (req, res) => {
    let resMes = await returnExistence(req);

    console.log(resMes);
    res.send(JSON.stringify(resMes));
});
