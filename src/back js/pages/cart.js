"use strict"

const database = require("../libraries/connect.js");
const utilities = require("../libraries/utilities.js");
const path = require("node:path"); // use an especific path to save time

const main = (req) => {
    return new Promise(res => {
        if (req.reason == "getReserved") {
            database.query(`select id, name, price, description from products where owner = '${req.user}'`, async (e, resp) => {
                if (e) throw e;
                else if (resp.length == 0) res(['no-products']);

                for (let element of resp) {
                    element.extension = await utilities.getImgExt(element.id, path.join(__dirname + "../../../sources/productImages"));
                }

                res(resp);
            });   
        }
    });
}

const index = {}

index.main = main;

module.exports = index;