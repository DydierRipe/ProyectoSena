"use strict"

const database = require("../libraries/connect.js");

const main = (req) => {
    return new Promise(res => {

        //database.query(`select * from users 
        //where email = '${req.body.email}' or username = '${req.body.email}'`, (e, resp) => {
            //if (e) throw e;

            //if (resp.length == 0) res(["N", "noRes"]);
            //else {
                //if (resp[0].passwrd == req.body.password) res(["NC", resp[0]]);
                //else res(["NI", "noRes"]);
            //}
        //});
    });
}

const product = {}

product.main = main;

module.exports = product;