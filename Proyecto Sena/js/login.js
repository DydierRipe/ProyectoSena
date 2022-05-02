"use-strict"

const loginButton = document.querySelector(".login-chart__button-login");
const email = document.querySelector("#login-chart__form__email");
const password = document.querySelector("#login-chart__form__password");

let requeriments = [false, false];

loginButton.addEventListener("click", () => {
    const errorMsg1 = email.previousElementSibling;
    const errorMsg2 = password.previousElementSibling;

    if (email.value.length < 1)
    {
        errorMsg1.textContent = "enter a username or email";
        errorMsg1.style.display = "block";
    }
    else {
        if (errorMsg1.style.display == "block")
        {
            errorMsg1.style.display = "none";
            errorMsg1.textContent = "";
        }

        if (password.value.length < 1)
        {
            errorMsg2.textContent = "enter a password";
            errorMsg2.style.display = "block";
        }
        else {
            if (errorMsg2.style.display == "block")
            {
                errorMsg2.style.display = "none";
                errorMsg2.textContent = "";
            }

            // call server
        }
    }
});
