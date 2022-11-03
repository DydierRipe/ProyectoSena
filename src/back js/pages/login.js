"use strict"

const utilities = require("../libraries/utilities.js");

const main = async (req) => {
    let resMes1 = await utilities.returnExistence(req, "usernames.JSON", "email", "UN");

    if (resMes1[0] !== "N") {
        resMes1[2].body.password = req.body.password;
        return await utilities.returnExistence(resMes1[2], "users.JSON", "email", "email"); // verify if the acount is created and the password is correct
    } else {
        req.body.email = req.body.email.toLowerCase();
        return await utilities.returnExistence(req, "users.JSON", "email", "email"); // verify if the acount is created and the password is correct
    }
}

const login = {}

login.main = main;

module.exports = login;
