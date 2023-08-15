const database = require("../libraries/connect.js");

const frecuencyOrdered = (arr) => {
    const frecuency = {};

    arr.forEach(element => {
        frecuency[element] = (frecuency[element] || 0) + 1;
    });
    
    const orderedElements = Object.keys(frecuency).sort((a, b) => frecuency[b] - frecuency[a]);
    
    return orderedElements;
}

const main = async (req) => {
    return await new Promise(async (res) => {

        database.query(`select id, name, price, productImage, filters from products` + ((req.lim)? ` where name like "%${req.search}%"` : ``), (e, resp) => {
            if (e) {
                res(["ERROR"]);
                throw e;
            }
            if (resp.length > 0) { 
                if (req.filters) {
                    const filteredList = [];
                    for (const elem of resp) {
                        for (const element of JSON.parse(elem.filters)) {
                            if (req.filters.includes(element)) {
                                filteredList.push(elem);
                            }
                        }
                    }
                    if (filteredList.length > 0) {
                        res(frecuencyOrdered(filteredList));
                    } else {
                        res(["NO DATA"]);
                    }

                } else res(resp);
            }
            else res(["NO DATA"]);
        });
    });
}

const search = {}

search.main = main;

module.exports = search;