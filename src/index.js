"use strict"

const fs = require("node:fs"); // file system (get and write server files)
const path = require("node:path"); // use an especific path for save time
const express = require("express"); // express library (nothing would work without this)
const algorithm = require("./back js/algorithms.js"); // algoritms writed by us
const nodemailer = require("nodemailer"); // send emails
const { join } = require("node:path");

const app = express();

app.use(express.json()); // can interpret json
app.use(express.static(__dirname + "/front")); // front end files searching ease

app.listen(3000, () => {
    console.log("server is working");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// return content of a file
const returnData = (fileName) => {
    return new Promise((res, rej) => {
        fs.readFile(__dirname + "/files/" + fileName, (err, data) => {
            if (err) {rej(err)} // error
            else {
                res(JSON.parse(data.toString())); // return file in json format
            }
        });
    });
}

/*
    N: Not Exist
    NC: Exist, password correct
    NI: Exist, password incorrect
*/

const returnExistence = (req, fName) => {
    return new Promise(async (res) => {
        let data = await returnData(fName);
        
        const exist = algorithm.searching(data, req.body.email, "email"); // verify if the request exist in a file
    
        if (!exist) {
            res(["N", "noRes"]);
        } else {
            if (exist[0].password == req.body.password) { // password verification
                res(["NC", exist[0]]);
            } else {
                res(["NI", "noRes"]); 
            }
        }
        
    });
}

// get file data, insert especific data, sort it and return it
const returnOrgData = (req, fileName) => {
    return new Promise(async (res) => {
        let users = await returnData(fileName); // get file content
        users.push(req.body); // insert user
        res(algorithm.quickSort(users, 0, users.length - 1, "email")); // return sorted data
    });
}

/*
    FE: file Error
    CE: Content Eliminated
    FNE: File Not Exist
*/

const deleteFromFile = (req, fileName) => {
    return new Promise(async (res, rej) => {
        const fileContent = await returnData(fileName); // get data of a specific file
        const exist = algorithm.searching(fileContent, req.body.email, "email"); // look if the email exist in the got data

        if (exist) {
            fileContent.splice(exist[1], 1); // delete data

            // write the respective file
            fs.writeFile(__dirname + "/files/" + fileName, JSON.stringify(fileContent), err => {
                if (err) rej(err);
                else res("CE");
            });
        } else {
            res("FNE");
        }
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    let resMes = await returnExistence(req, "users.JSON"); // verify if the acount is created and the password is correct

    res.send(JSON.stringify(resMes));
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
        const exist1 = await returnExistence(req, "users.JSON"), exist2 = await returnExistence(req, "waitingUsers.JSON"); // look if the user is not registered or is not being registered
        if (exist1[0] == "N" && exist2[0] == "N") {
            let sortedData, verCode = Math.floor(Math.random()*(999999 - 100001) + 100001); // generate the verification code

            req.body.code = verCode; // add code to json
            sortedData = await returnOrgData(req, "waitingUsers.JSON"); // sort data for write file

            fs.writeFile(__dirname + "/files/waitingUsers.JSON", JSON.stringify(sortedData), err => {
                if (err) {
                    console.log(err); // error
                    res.send("FE");
                } else {
                    // uses gmail host with port 465 (for verificated and secure host), defines the gmail externs pasword
                    const transporter = nodemailer.createTransport({
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
                    });

                    let options = {
                        from: 'Verificate your acount <lacanastasegura@gmail.com>',
                        to: req.body.email,
                        subject: 'Hi, Confirm your "Canasta Segura" acount',
                        html: `<h1 style="text-align: center;">Confirm your acount</h1><br>
                        <p style="text-align: center; font-size: 20px;">Hi ${req.body.username}, we wrote this messaje for welcome you to our page, then we attach your verification code</p><br>
                        
                        <h2 style="text-align: center;">Your Verification Code: ${verCode}</h2>`
                    }

                    transporter.sendMail(options);

                    res.send("EmS");
                }
            });
        } else {
            res.send("E");
        }
    } else if (req.body.reason === "Confirm") {
        let exist = await returnExistence(req.body, "waitingUsers.JSON"); // see if the user is in the waiting room

        /*
        FE: File Error
        CM: Code Matches
        CNM: Code Not Matches
        */
        if (exist) {
            if (exist[1].code === req.body.value) {
                let response = await deleteFromFile(req.body, "waitingUsers.JSON"); // delete user of the waiting room

                if (response === "CE") {
                    let sortedData = await returnOrgData(req.body, "users.JSON"); // insert user and sort the users list
                    fs.writeFile(__dirname + "/files/users.JSON", JSON.stringify(sortedData), err => {
                        if (err) {
                            console.log(err); // error
                            res.send("FE");
                        } else {
                            res.send("CM"); // successfully created account :DDD
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
        let response = await deleteFromFile(req, "waitingUsers.JSON"); // so bad, the user couldn't be registered
        res.send(response);
    }
});
