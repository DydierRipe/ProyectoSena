const database = require("../libraries/connect.js");

const main = async (req) => {
    return await new Promise(async (res) => {
        database.query(`select id, name, price, productImage from products where name like "%${req}%"`, (e, resp) => {
            if (e) {
                res(["ERROR"]);
                throw e;
            }
            if (resp.length > 0) res(resp);
            else res(["NO DATA"]);
        });
    });
}

const search = {}

search.main = main;

module.exports = search;