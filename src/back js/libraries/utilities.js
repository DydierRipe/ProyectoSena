"use strict"

const nodemailer = require("nodemailer"); // send emails

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
        console.log("ready to send in");
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

utilities.sendEmail = sendEmail;

module.exports =  utilities;
