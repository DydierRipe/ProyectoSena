"use strict"

const loginButton = document.querySelector(".login-chart__button-login");
const email = document.querySelector("#login-chart__form__email");
const password = document.querySelector("#login-chart__form__password");

const language = window.location.pathname.split('/')[1];

// if a user is already logged redirect
if (localStorage.getItem("user") !== null) {
    window.location.replace('/' + language);
}

const loginVerification = () => { 
    const errorMsg1 = email.previousElementSibling;
    const errorMsg2 = password.previousElementSibling;

    email.value = email.value.replace(" ", ""); // evade errors and things like that

    if (email.value.length < 4) { // test email
        errorMsg1.textContent = "enter a valid email or username";
        errorMsg1.style.display = "block";
    } else {
        if (errorMsg1.style.display == "block") {
            errorMsg1.style.display = "none";
            errorMsg1.textContent = "";
        }

        if (password.value.length < 1) {
            errorMsg2.textContent = "enter a password";
            errorMsg2.style.display = "block";
        } else {
            if (errorMsg2.style.display == "block") {
                errorMsg2.style.display = "none";
                errorMsg2.textContent = "";
            }

            fetch(window.location.href.split('#')[0], { 
                method: "POST",
                body: JSON.stringify({"email":email.value.replace(" ", ""),"password":password.value}),
                headers : { "Content-type" : "application/json" }
            }).then(res => res.text())
            .then(res => {
                res = JSON.parse(res);
                if (res[0] == 'N') {
                    errorMsg1.textContent = "user does not exist";
                    errorMsg1.style.display = "block";
                } else if (res[0] == "NI") {
                    errorMsg1.textContent = "password or email incorrect";
                    errorMsg2.textContent = "password or email incorrect";
                    errorMsg1.style.display = "block";
                    errorMsg2.style.display = "block";
                    password.value = '';
                } else {
                    if (errorMsg1.display !== "none" || errorMsg2.display !== "none") {
                        errorMsg2.display = errorMsg1.display = "none";
                    }

                    localStorage.setItem("user", JSON.stringify({"email":res[1].email,"username":res[1].username})); // save data

                    window.location.replace('/' + language);
                }
            });
        }
    }
}

loginButton.addEventListener("click", () => {
    loginVerification();
});

document.addEventListener("keypress", e => {
    if (e.code == "Enter") {
        loginVerification();
    }
});
