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
        } else if (req.reason == "buy") {
            database.query(`select name, price, seller from products where id = ${req.id}`, async (e, resp) => {
                if (e) throw e;
                else if (resp.length == 0) res(['no-products']);

                database.query(`insert into solditems values (${req.id}, '${resp[0].name}', ${resp[0].price}, '${resp[0].seller}', '${req.user}', '${req.adress}')`,
                (er) => {
                    if (er) throw er;

                    database.query(`delete from products where id = ${req.id}`, err => {
                        if (err) throw err;
                        
                        utilities.sendEmail(
                            'Someone has just bought your product <lacanastasegura@gmail.com>',
                            resp[0].seller,
                            'Hi,',
                            `<h1 style="text-align: center;">Congrats!!!</h1><br>
                            <p style="text-align: center; font-size: 20px;">Hi, someone has just bought your product named as "${resp[0].name}"</p><br>
                            <h2 style="text-align: center;">We need you to complete some data, so enter the link below to start with the cool part</h2><br>
                            <p style="text-align: center; font-size: 20px;">Once you complete the required data, a servientrega dealer will come to your house and get the product, 
                            once the product gets to the client, we will let you know, and if the client does not have any complain, the money will be yours</p>`
                        );
                        
                        utilities.sendEmail(
                            'Verificate your acount <lacanastasegura@gmail.com>',
                            req.user,
                            'Thank u for ur purchase',
                            `<h1 style="text-align: center;">You have just purchased an item!!</h1><br>
                            <p style="text-align: center; font-size: 20px;">Your item will arrive in about two weeks, but you can cancell whenever you want and get your money back</p><br>
                            <h2 style="text-align: center;">Once your item arrives you have 30 days to complain if you dont feel satisfied, you just have to call the number +57 318 384 9019</h2>`
                        );

                        res(['sus']);
                    });
                });
            });
        } else {
            database.query(`update products set owner = 'no-owner' where id = ${req.id}`, err => {
                if (err) throw err;
                res(["deleted"]);
            });
        }
    });
}

const index = {}

index.main = main;

module.exports = index;