"use strict"

// i won't explain it, this things are the elements of the sign up page
const chart = document.querySelector(".sign-chart");
const button = document.querySelector(".sign-chart__button-sign");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const verification = document.querySelector(".verification");
const backButton = document.querySelector(".verification-chart__button-verify__back")
const verifyButton = document.querySelector(".verification-chart__button-verify__verify");
const creating = document.querySelector(".creating");
const verifying = document.querySelector(".verifying");

const reqGroup = [username, email, password]; // user text spaces
const user = {}; // user info
let bCanDeleteFormWaiting = false, bNotThisTimeC = false, bNotThisTimeV = false; // some boobleans that evade some bugs

// if a user is already logged redirect
if (localStorage.getItem("user") !== null) {
    window.location.replace("../");
}

// actives when the back button is pressed (in verification)
const deleteWaiting = () => {
    if (bCanDeleteFormWaiting) {
        fetch("/signup", {
            method: "POST",
            body: JSON.stringify({"reason":"Exit","email":user.email,"username":user.username,"password":user.password}),
            headers : { "Content-type" : "application/json" }
        })
        .then(res => res.text())
        .then(res => {
            if (res === "FE") {
                console.log("there was a File error");
            } else if (res === "FNE") {
                console.log("the file not exist"); // imposible error? :00000
            } else if (res === "CE") {
                chart.style.animation = ".4s ease forwards enlarge"; // restore verification box

                creating.style.animation = ".4s ease forwards goRightCreate"; // returns to his place the creating box
                creating.style.display = "block";
                bNotThisTimeC = true; // evades that the animation end launches

                verifying.style.animation = ".4s ease forwards goRightVer"; // pulls out the verifying box of the chart

                bCanDeleteFormWaiting = false; // evades server errors
            }
        });
    }
}

const functionVerify = () => {
    if (!bCanDeleteFormWaiting) {
        let spaceValid = true, canBeSendToServer = true;
        // verify if the elements are void
        reqGroup.forEach(element => {
            if (element.value == "") {
                element.previousElementSibling.textContent = "fill this space";
                element.previousElementSibling.style.display = "block";
                spaceValid = false;
            } else {
                element.previousElementSibling.style.display = "none";
            }
        });

        // verify if the passed data are valid
        if (spaceValid) {
            if (username.value.length < 4) { // longer than 4 characters usernames
                canBeSendToServer = false;
                username.previousElementSibling.textContent = "your username must be longer than 3 characters";
                username.previousElementSibling.style.display = "block";
            } else {
                if (!/^[a-zA-Z0-9_-]*$/.test(username.value)) { // username only can have alphanumeric characters, _ and -
                    canBeSendToServer = false;
                    username.previousElementSibling.textContent = "your username only can have alphanumeric characters";
                    username.previousElementSibling.style.display = "block";
                }
            }

            email.value = email.value.replace(" ", ""); // if the user input an accidental space

            if (!email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) { // email super complex verification (hacker :000)
                canBeSendToServer = false;
                email.previousElementSibling.textContent = "insert a valid email";
                email.previousElementSibling.style.display = "block";
            }

            if (password.value.length <= 8) { // the password is responsability of each person, we only will verify if the password is longer than 8 characters
                canBeSendToServer = false;
                password.previousElementSibling.textContent = "your password must be longer than 8 characters"; 
                password.previousElementSibling.style.display = "block";
            }

            if(canBeSendToServer) {
                // defines user values
                user.email = email.value;
                user.username = username.value;
                user.password = password.value;

                fetch("/signup", {
                    method: "POST",
                    body: JSON.stringify({"reason":"Existence","email":user.email,"username":user.username,"password":user.password}),
                    headers : { "Content-type" : "application/json" }
                }).then(res => res.text())
                .then(res => {
                    console.log(res)
                    if (res === "EE") {
                        email.previousElementSibling.textContent = "The email is already registered";
                        email.previousElementSibling.style.display = "block";
                    } else if (res === "EU") {
                        username.previousElementSibling.textContent = "The username is already taken";
                        username.previousElementSibling.style.display = "block";
                    } else if (res === "FE") {
                        username.previousElementSibling.textContent = "Your account has not been registered, there was an error, try again later";
                        username.previousElementSibling.style.display = "block";
                    } else if (res === "EmS") {
                        chart.style.animation = ".4s ease forwards reduce"; // reduce chart

                        verifying.style.animation = ".4s ease forwards goLeftVer"; // pulls in the verifying chart into the main chart
                        verifying.style.display = "block";
                        bNotThisTimeV = true;

                        creating.style.animation = ".4s ease forwards goLeftCreate"; // pulls out that thing, ya know
                        
                        bCanDeleteFormWaiting = true; // now can be deleted
                    } else {
                        console.log("what");
                    }
                });
            }
        }
    }
}

const functionVerifyNumber = () => {
    if (bCanDeleteFormWaiting) {
        let value = verification.value;

        if (verification.type !== "number") { // if the user wants to play with the html of the page
            verification.parentElement.parentElement.firstElementChild.textContent = "your verification number can't pass if is not a number, nasty cheater";
            verification.parentElement.parentElement.firstElementChild.style.display = "block";
        } else {
            verification.parentElement.parentElement.firstElementChild.style.display = "none";
            verification.value.replace("e", "");

            if (value.length < 6 || value.length > 6) { // only can have 6 digits
                verification.parentElement.parentElement.firstElementChild.textContent = "your verification number must be a number of 6 digits";
                verification.parentElement.parentElement.firstElementChild.style.display = "block";
            } else {
                verification.parentElement.parentElement.firstElementChild.style.display = "none";
                value = JSON.parse(value);
                fetch("/signup", {
                    method: "POST",
                    body: JSON.stringify({"reason":"Confirm","body":{"email":user.email.toLowerCase(),"username":user.username,"password":user.password},"value":value}),
                    headers : { "Content-type" : "application/json" }
                }).then(res => res.text())
                .then(res => {
                    if (res === "CM") {
                        console.log("account registered");

                        delete user.password;

                        localStorage.setItem("user", JSON.stringify(user));

                        window.location.replace("../");
                    } else if (res === "CNM")
                    {
                        verification.parentElement.parentElement.firstElementChild.textContent = "Verification number incorrect";
                        verification.parentElement.parentElement.firstElementChild.style.display = "block";
                    } else if(res === "FE") {
                        verification.parentElement.parentElement.firstElementChild.textContent = "There was a server Error, try again later";
                        verification.parentElement.parentElement.firstElementChild.style.display = "block";
                    } else {
                        verification.parentElement.parentElement.firstElementChild.textContent = "Haha lol an imposible error (try again later)";
                        verification.parentElement.parentElement.firstElementChild.style.display = "block";
                    }
                });
            }
        }
    }
}

creating.addEventListener("animationend", () => {
    if (!bNotThisTimeC) {
        if (creating.style.display !== "none") creating.style.display = "none";
    } else {
        bNotThisTimeC = false;
    }
});

verifying.addEventListener("animationend", () => {
    if (!bNotThisTimeV) {
        if (verifying.style.display !== "none") verifying.style.display = "none";
    } else {
        bNotThisTimeV = false; 
    }
});

// prevents that the user input values higger than 6 characters
verification.addEventListener("input", () => {
    if (verification.value.length > 6) {
        verification.value = verification.value.slice(0,6); 
    }
});

button.addEventListener("click", () => {
    functionVerify();
});

backButton.addEventListener("click", () => {
    deleteWaiting();
});

verifyButton.addEventListener("click", ()=> {
    functionVerifyNumber();
});

document.addEventListener("keypress", e => {
    if (e.code == "Enter") {
        functionVerify();
        functionVerifyNumber();
    }
});
