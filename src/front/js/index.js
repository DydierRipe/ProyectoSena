"use strict"

const userString = localStorage.getItem("user"); // user info


if (userString === null) {
    const pus = document.querySelector("p");
    pus.innerHTML = "not logged";
} else {
    const user = JSON.parse(userString);
    const pus = document.querySelector("p");
    pus.innerHTML = `user: ${user.username}<br>email: ${user.email}`;

    const getOut = document.querySelector(".get-out");

    getOut.addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.replace("/login");
    });
}
