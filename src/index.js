"use strict"

const fs = require("node:fs"); // file system (get and write server files)
const path = require("node:path"); // use an especific path for save time
const express = require("express"); // express library (nothing would work without this)
const utilities = require("./back js/utilities.js");

const app = express();

app.use(express.json()); // can interpret json
app.use(express.static(__dirname + "/front")); // front end files searching ease

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
    let resMes1 = await utilities.returnExistence(req, "usernames.JSON", "email", "UN");

    if (resMes1[0] !== "N") {
        resMes1[2].body.password = req.body.password;
        let resMes2 = await utilities.returnExistence(resMes1[2], "users.JSON", "email", "email"); // verify if the acount is created and the password is correct
        res.send(resMes2);
    } else {
        req.body.email = req.body.email.toLowerCase();
        let resMes2 = await utilities.returnExistence(req, "users.JSON", "email", "email"); // verify if the acount is created and the password is correct
        res.send(resMes2);
    }
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
    if (req.body.reason == "Existence") {
        req.body.email = req.body.email.toLowerCase();
        const exist1 = await utilities.returnExistence(req, "users.JSON", "email", "email"), exist2 = await utilities.returnExistence(req, "waitingUsers.JSON", "email", "email"), exist3 = await utilities.returnExistence(req, "usernames.JSON", "UN", "username"); // look if the user is not registered or is not being registered
        if (exist1[0] === "N" && exist2[0] === "N" && exist3[0] === "N") {
            let sortedData, verCode = Math.floor(Math.random()*(999999 - 100001) + 100001); // generate the verification code

            req.body.code = verCode; // add code to json
            sortedData = await utilities.returnOrgData(req, "waitingUsers.JSON", "email"); // sort data for write file

            fs.writeFile(__dirname + "/files/waitingUsers.JSON", JSON.stringify(sortedData), err => {
                if (err) {
                    console.log(err); // error
                    res.send("FE");
                } else {
                    utilities.sendEmail(
                        'Verificate your acount <lacanastasegura@gmail.com>',
                        req.body.email,
                        'Hi, Confirm your "Canasta Segura" acount',
                        `<h1 style="text-align: center;">Confirm your acount</h1><br>
                        <p style="text-align: center; font-size: 20px;">Hi ${req.body.username}, we wrote this messaje for welcome you to our page, then we attach your verification code</p><br>
                        <h2 style="text-align: center;">Your Verification Code: ${verCode}</h2>`
                    );

                    res.send("EmS");
                }
            });
        } else {
            if (exist1[0] !== "N" && exist2[0] !== "N") {
                res.send("EE");
            } else {
                res.send("EU");
            }
        }
    } else if (req.body.reason === "Confirm") {
        let exist = await utilities.returnExistence(req.body, "waitingUsers.JSON", "email", "email"); // see if the user is in the waiting room

        /*
        FE: File Error
        CM: Code Matches
        CNM: Code Not Matches
        */
        if (exist) {
            if (exist[1].code === req.body.value) {
                let response = await utilities.deleteFromFile(req.body, "waitingUsers.JSON"); // delete user of the waiting room

                if (response === "CE") {
                    let sortedData = await utilities.returnOrgData(req.body, "users.JSON", "email"); // insert user and sort the users list
                    fs.writeFile(__dirname + "/files/users.JSON", JSON.stringify(sortedData), async err => {
                        if (err) {
                            console.log(err); // error
                            res.send("FE");
                        } else {
                            let username = {"body":{"UN":req.body.body.username,"email":req.body.body.email}}
                            let SD = await utilities.returnOrgData(username, "usernames.JSON", "UN");
                            fs.writeFile(__dirname + "/files/usernames.JSON", JSON.stringify(SD), async err => {
                                if (err) {
                                    console.log(err); // error
                                    let rsp = await utilities.deleteFromFile(req.body, "waitingUsers.JSON"); // delete user of the waiting room
                                    if (rsp !== "CE") {
                                        console.log("oh shit, we have a huge problem");
                                        utilities.sendEmail(
                                            'We have a huge problem <lacanastasegura@gmail.com>',
                                            "dydierripe@gmail.com, anthonellam14@gmail.com, neidymeneses01@gmail.com, mauriciopulidorodrigues@gmail.com, jhonandersonvelozaparra@gmail.com",
                                            'An user had a probles with register and the files needs an urgent intervention',
                                            `<h1 style="text-align: center;">URGENT!!!!!</h1><br>
                                            <p style="text-align: center; font-size: 20px;">User Information: ${req.body.body.username}, ${req.body.body.email}</h2>`
                                        );
                                    }
                                    res.send("FE");
                                } else {
                                    res.send("CM"); // successfully created account :DDD
                                }
                            });
                        }
                    });
                } else {
                    res.send("bad luck I supose");
                }
            } else {
                res.send("CNM");
            }
        } else {
            res.send("WTFFFF the user does not apears"); // haha lol imposible error
        }
    } else if (req.body.reason === "Exit") {
        console.log("tried to exit");
        let response = await utilities.deleteFromFile(req, "waitingUsers.JSON"); // so bad, the user couldn't be registered
        res.send(response);
    }
});
