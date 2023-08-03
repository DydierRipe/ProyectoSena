"use strict"

const promotions = document.querySelector(".promotions");

const userString = localStorage.getItem("user"); // user info

for (let i = 0; i < promotions.children.length; i++) {
    promotions.children[i].addEventListener("mouseover", () => {
        promotions.children[1].style = "transform: scale(100%);"
    });
    
    promotions.children[i].addEventListener("mouseout", () => {
        promotions.children[1].style = "transform: scale(120%);"
    });
}

if (userString === null) {
    const pus = document.querySelector(".logged > p");
    pus.innerHTML = "Not logged";
} else {
    const user = JSON.parse(userString);
    const pus = document.querySelector(".logged > p > span");
    pus.innerHTML = `user: ${user.username}<br>email: ${user.email}`;

    const getOut = document.querySelector(".get-out");

    getOut.addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.replace("/login"); 
    });
}
