"use strict"
const database = require("../libraries/connect.js");

const main = async (req) => {
    return await new Promise(async (res) => {
        if (req.reason == "permission") {
            database.query(`select permissionlevel from users where email = "${req.user.email}"`, (e, resp) => {
                if (e || resp.length == 0) {
                    res(["FE"]);
                    throw e;
                }

                if (resp[0].permissionlevel != 1) {
                    res(["No Permission"]);
                } else {
                    database.query(`select email, username, permissionlevel from users`, (e, respo) => {
                        if (e) throw e;
                        res(respo);
                    });
                    
                }
            });
        }
    });
}

const users = {}

users.main = main;

module.exports = users;

