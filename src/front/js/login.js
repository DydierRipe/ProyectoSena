"use strict"

const loginButton = document.querySelector(".login-chart__button-login");
const email = document.querySelector("#login-chart__form__email");
const password = document.querySelector("#login-chart__form__password");
const translate = document.querySelector(".translate");

const language = window.location.pathname.split('/')[1];
setLang(language, "login");
let langOp = false;

// if a user is already logged redirect
if (localStorage.getItem("user") !== null) {
    window.location.replace('/' + language);
}

const loginVerification = () => { 
    const errorMsg1 = email.previousElementSibling;
    const errorMsg2 = password.previousElementSibling;

    email.value = email.value.replace(" ", ""); // evade errors and things like that

    if (email.value.length < 4) { // test email
        errorMsg1.textContent = getLangText()[1][0];
        errorMsg1.style.display = "block";
    } else {
        if (errorMsg1.style.display == "block") {
            errorMsg1.style.display = "none";
            errorMsg1.textContent = "";
        }

        if (password.value.length < 1) {
            errorMsg2.textContent = getLangText()[1][1];
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
                    errorMsg1.textContent = getLangText()[1][2];
                    errorMsg1.style.display = "block";
                } else if (res[0] == "NI") {
                    errorMsg1.textContent = getLangText()[1][3];
                    errorMsg2.textContent = getLangText()[1][3];
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

translate.addEventListener("click", () => {
    const transCont = document.querySelector(".translation-container");
    translate.style.zIndex = 10;

    const fr = document.createDocumentFragment();
    const element1 = document.createElement("div");
    const element2 = document.createElement("div");
    const element3 = document.createElement("div");

    let i = 0;
    const lang = ['en', 'es', 'de'];
    const elementCol = [element1, element2, element3];
    for (const el of elementCol) {
        el.classList.add("translate");
        el.style.gridColumn = `${i+1}/${i+2}`;
        el.textContent = lang[i].toUpperCase();
        
        if (i == 1) {
            el.style.gridRow = '7 / 9';
            el.style.marginTop = '-75px';
        } else {
            el.style.gridRow = '6 / 8';
            el.style.marginTop = '-62.5px';
            el.style.marginLeft = (i == 0)? '68px' : '-68px';
        }

        el.style.animation = 'repos .3s forwards';

        el.addEventListener("click", () => {
            window.location.replace('/' + el.textContent.toLowerCase() + '/' + window.location.pathname.split('/')[2]);
        });

        fr.appendChild(el);
        i++;
    }

    elementCol.push(translate, translate.firstElementChild);

    document.addEventListener("click", e => {
        if (!elementCol.includes(e.target)) {
            for (let i = 0; i < elementCol.length; i++) {
                if (i < 3) {
                    elementCol[i].style.animation = 'fader .3s forwards';
                    setTimeout(() => {elementCol[i].remove();}, 320);
                }
            }
        }
    });

    transCont.appendChild(fr);
});
