"use strict"

const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const algorithm = require("./back js/algorithms.js");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/front"))

app.listen(3000, () => {
    console.log("server is working");
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

const returnExistence = (req, fName) => {
    return new Promise((res, rej) => {
        fs.readFile(__dirname + "/files/" + fName, (err, data) => {
            if (err){rej(err)} 
            else {
                const exist = algorithm.searching(JSON.parse(data.toString()), req.body.email, "email");
    
                if (!exist) {
                    res(["N", "noRes"]);
                }
                else {
                    if (exist.password == req.body.password)
                    {
                        res(["NC", exist]);
                    }
                    else {
                        res(["NI", "noRes"]); 
                    }
                }
            }
        });
    })
}

app.post("/login", async (req, res) => {
    let resMes = await returnExistence(req, "users.JSON");

    console.log(resMes);
    res.send(JSON.stringify(resMes));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname + "/front/html/signup.html"));
});

const returnOrgData = (req, verCode) => {
    return new Promise((res, rej) => {
        fs.readFile(__dirname + "/files/waitingUsers.JSON", (err, data) => {
            if (err) {rej(err)}
            else {
                req[verCode] = verCode;
                let users = JSON.parse(data.toString());
                users.push(req.body);
                res(algorithm.quickSort(users, 0, users.length - 1, "email"));
            }
        });
    })
}

/*
    response Types: 
        E: the email is already registered
        FE: file error, the email can be registered (not exist in the database) but there was an error in the database writing system, try again later
        EmS: email sended
*/ 

app.post("/signup", async (req, res) => {
    if (req.body.reason == "Existence") {
        const exist1 = await returnExistence(req, "users.JSON"), exist2 = await returnExistence(req, "waitingUsers.JSON");
        if (exist1[0] == "N" && exist2 == "N")
        {
            let sortedData, verCode = Math.floor(Math.random()*(999999 - 100001) + 100001);

            sortedData = await returnOrgData(req, verCode);

            fs.writeFile(__dirname + "/files/waitingUsers.JSON", JSON.stringify(sortedData), err => {
                if (err) {
                    console.log(err);
                    res.send("FE");
                }
                else {
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'lacanastasegura@gmail.com',
                            pass: "lsmgzbqkrcviuvet"
                        }
                    });

                    transporter.verify().then(()=>{
                        console.log("ready for send in");
                    })

                    let options = {
                        from: 'Verificate your acount <lacanastasegura@gmail.com>',
                        to: req.body.email,
                        subject: 'Hi, Confirm your "Canasta Segura" acount',
                        html: `<h1 style="text-align: center;">Confirm your acount</h1><br>
                        <p style="text-align: center; font-size: 20px;">Hi ${req.body.username}, we wrote this messaje for give you the welcome to our page, next we are going to attach your verification code</p><br>
                        
                        <h2 style="text-align: center;">Your Verification Code: ${verCode}</h2>`
                    }

                    transporter.sendMail(options);

                    res.send("EmS");
                }
            })
        }
        else {
            res.send("E");
        }
    }
    else if (req.body.reason == "Confirm")
    {

    }
    else if (req.body.reason == "noCode")
    {

    }
});
