"use strict"

const database = require("../libraries/connect.js");
const utilities = require("../libraries/utilities.js");
const path = require("node:path"); // use an especific path to save time

const main = (req) => {
    return new Promise(res => {
        if (req.reason == 'getProductData') {
            database.query(`select name, price, description, filters from products where id = ${req.id}`, async (e, resp) => {
                if (e) {
                    console.log(e)
                    throw e;
                }
                
                if (resp.length == 0) res(["FE"]);
                else {
                    resp[0].extension = await utilities.getImgExt(req.id, path.join(__dirname + "../../../sources/productImages"));
                    res(resp);
                }
            });
        }
    });
}

const product = {}

product.main = main;

module.exports = product;