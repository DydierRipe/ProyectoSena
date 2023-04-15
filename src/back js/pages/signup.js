"use strict"

const utilities = require("../libraries/utilities.js");
const fs = require("node:fs"); // file system (get and write server files)
const { restart } = require("nodemon");

const main = async (req) => {
    return await new Promise(async (res) => {
        if (req.reason == "Existence") {
            req.email = req.email.toLowerCase();
            const exist1 = await utilities.returnExistence(req, "users.JSON", "email", "email"), exist2 = await utilities.returnExistence(req, "waitingUsers.JSON", "email", "email"), exist3 = await utilities.returnExistence(req, "usernames.JSON", "username", "UN"); // look if the user is not registered or is not being registered
            
            if (exist1[0] === "N" && exist2[0] === "N" && exist3[0] === "N") {
    
                let sortedData, verCode = Math.floor(Math.random()*(999999 - 100001) + 100001); // generate the verification code
    
                req.code = verCode; // add code to json
                sortedData = await utilities.returnOrgData(req, "waitingUsers.JSON", "email"); // sort data for write file
                
                fs.writeFile("src/files/waitingUsers.JSON", JSON.stringify(sortedData), err => {
                    if (err) {
                        console.log(err); // error
                        res("FE");
                    } else {
                        utilities.sendEmail(
                            'Verificate your acount <lacanastasegura@gmail.com>',
                            req.email,
                            'Hi, Confirm your "Canasta Segura" acount',
                            `<h1 style="text-align: center;">Confirm your acount</h1><br>
                            <p style="text-align: center; font-size: 20px;">Hi ${req.username}, we wrote this messaje for welcome you to our page, then we attach your verification code</p><br>
                            <h2 style="text-align: center;">Your Verification Code: ${verCode}</h2>`
                        );
                        
                        res("EmS");
                    }
                });
            } else {
                if (exist1[0] !== "N" || exist2[0] !== "N") {
                    res("EE");
                } else {
                    res("EU");
                }
            }
        } else if (req.reason === "Confirm") {
            let exist = await utilities.returnExistence(req.body, "waitingUsers.JSON", "email", "email"); // see if the user is in the waiting room
    
            /*
            FE: File Error
            CM: Code Matches
            CNM: Code Not Matches
            */
            if (exist[0]) {
                if (exist[1].code === req.value) {
                    let response = await utilities.deleteFromFile(req.body, "waitingUsers.JSON"); // delete user of the waiting room
                    if (response === "CE") {
                        let sortedData = await utilities.returnOrgData(req.body, "users.JSON", "email"); // insert user and sort the users list
                        fs.writeFile("src/files/users.JSON", JSON.stringify(sortedData), async err => {
                            if (err) {
                                console.log(err); // error
                                res("FE");
                            } else {
                                let username = {"UN":req.body.username,"email":req.body.email}
                                let SD = await utilities.returnOrgData(username, "usernames.JSON", "UN");
                                fs.writeFile("src/files/usernames.JSON", JSON.stringify(SD), async err => {
                                    if (err) {
                                        console.log(err); // error
                                        let rsp = await utilities.deleteFromFile(req.body, "waitingUsers.JSON"); // delete user of the waiting room
                                        if (rsp !== "CE") {
                                            console.log("oh shit, we have got a huge problem");
                                            utilities.sendEmail(
                                                'We have a huge problem <lacanastasegura@gmail.com>',
                                                "dydierripe@gmail.com, anthonellam14@gmail.com, neidymeneses01@gmail.com, mauriciopulidorodrigues@gmail.com, jhonandersonvelozaparra@gmail.com",
                                                'An user had a probles with register and the files needs an urgent intervention',
                                                `<h1 style="text-align: center;">URGENT!!!!!</h1><br>
                                                <p style="text-align: center; font-size: 20px;">User Information: ${req.body.username}, ${req.body.email}</h2>`
                                            );
                                        }
                                        res("FE");
                                    } else {
                                        res("CM"); // successfully created account :DDD
                                    }
                                });
                            }
                        });
                    } else {
                        res("bad luck I guess");
                    }
                } else {
                    res("CNM");
                }
            } else {
                res("WTFFFF the user does not apears"); // haha lol imposible error
            }
        } else if (req.reason === "Exit") {
            console.log("tried to exit");
            let response = await utilities.deleteFromFile(req, "src/files/waitingUsers.JSON"); // so bad, the user couldn't be registered
            res(response);
        }
    });
}

const signup = {}

signup.main = main;

module.exports = signup;
