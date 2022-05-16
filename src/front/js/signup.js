"use strict"

const button = document.querySelector(".sign-chart__button-sign");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const reqGroup = [username, email, password];

button.addEventListener("click", () => {
    let spaceValid = true, canBeSendToServer = true;
    reqGroup.forEach(element => {
        if (element.value == "")
        {
            element.previousElementSibling.textContent = "fill this space";
            element.previousElementSibling.style.display = "block";
            spaceValid = false;
        }
        else {
            element.previousElementSibling.style.display = "none";
        }
    });

    if (spaceValid) 
    {
        if (username.value.length < 4)
        {
            canBeSendToServer = false;
            username.previousElementSibling.textContent = "your username must be longer than 3 characters";
            username.previousElementSibling.style.display = "block";
        }
        else {
            if (!/^[a-zA-Z0-9 _-]*$/.test(username.value))
            {
                canBeSendToServer = false;
                username.previousElementSibling.textContent = "your username only can have alphanumeric characters";
                username.previousElementSibling.style.display = "block";
            }
        }

        if (!email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
        {
            canBeSendToServer = false;
            email.previousElementSibling.textContent = "insert a valid email";
            email.previousElementSibling.style.display = "block";
        }

        if (password.value.length <= 8)
        {
            canBeSendToServer = false;
            password.previousElementSibling.textContent = "your password must be longer than 8 characters";
            password.previousElementSibling.style.display = "block";
        }

        if(canBeSendToServer)
        {
            fetch("/signup", {
                method: "POST",
                body: JSON.stringify({"reason":"Existence","email":email.value,"username":username.value,"password":password.value}),
                headers : { "Content-type" : "application/json" }
            }).then(res => res.text())
            .then(res => {
                if (res === "E")
                {
                    email.previousElementSibling.textContent = "The email is already registered";
                    email.previousElementSibling.style.display = "block";
                }
                else if (res == "FE")
                {
                    username.previousElementSibling.textContent = "Your account has not been registered, there was an error, try again later";
                    username.previousElementSibling.style.display = "block";
                }
                else if (res == "Ems")
                {

                }
            });
        }
    }
});

