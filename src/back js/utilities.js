"use strict"

const fs = require("node:fs"); // file system (get and write server files)
const algorithm = require("./algorithms.js"); // algoritms writed by us
const nodemailer = require("nodemailer"); // send emails

// return content of a file
const returnData = (fileName) => {
    return new Promise((res, rej) => {
        fs.readFile(__dirname + "/../files/" + fileName, (err, data) => {
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

const returnExistence = (req, fName, value, EName) => {
    return new Promise(async (res) => {
        let data = await returnData(fName);
        
        const exist = algorithm.searching(data, req.body[value], EName); // verify if the request exist in a file
    
        if (!exist) {
            res(["N", "noRes"]);
        } else {
            if (exist[0].password == req.body.password) { // password verification
                res(["NC", exist[0]]);
            } else {
                res(["NI", "noRes", {"body":{"email":exist[0].email}}]); 
            }
        }
        
    });
}

// get file data, insert especific data, sort it and return it
const returnOrgData = (req, fileName, orderType) => {
    return new Promise(async (res) => {
        let users = await returnData(fileName); // get file content
        users.push(req.body); // insert user
        res(algorithm.quickSort(users, 0, users.length - 1, orderType)); // return sorted data
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
            fs.writeFile(__dirname + "/../files/" + fileName, JSON.stringify(fileContent), err => {
                if (err) rej(err);
                else res("CE");
            });
        } else {
            res("FNE");
        }
    });
}

const sendEmail = (iFrom, iTo, iSubject, iHtml) => {
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
        from: iFrom,
        to: iTo,
        subject: iSubject,
        html: iHtml
    }

    transporter.sendMail(options);
}

const utilities = {};

utilities.returnData = returnData;
utilities.returnExistence = returnExistence;
utilities.returnOrgData = returnOrgData;
utilities.deleteFromFile = deleteFromFile;
utilities.sendEmail = sendEmail;

module.exports =  utilities;
