"use strict"

const promotions = document.querySelector(".promotions");
const recAdded = document.querySelector(".promo-left");
const guitar = document.querySelector(".promo-center");
const etwNew = document.querySelector(".promo-right");
const gallery = document.querySelector(".product-gallery");

const languaje = window.location.pathname.split('/')[1];
let jstext;

recAdded.addEventListener("click", () => {
    window.location.replace('/' + languaje + "/search");
});

guitar.addEventListener("click", () => {
    localStorage.setItem("tags", JSON.stringify(["String"]));

    window.location.replace('/' + languaje + "/search");
});

etwNew.addEventListener("click", () => {
    localStorage.setItem("tags", JSON.stringify(["odd"]));

    window.location.replace('/' + languaje + "/search");
});

const userString = localStorage.getItem("user"); // user info

for (let i = 0; i < promotions.children.length; i++) {
    promotions.children[i].addEventListener("mouseover", () => {
        promotions.children[1].style = "transform: scale(100%);";
    });
    
    promotions.children[i].addEventListener("mouseout", () => {
        promotions.children[1].style = "transform: scale(120%);";
    });
}

jstext = setLang(languaje, 'index');
console.log(jstext);

if (userString === null) {
    const pus = document.querySelector(".logged > p");
    pus.innerHTML = "Not logged";
} else {
    const user = JSON.parse(userString);
    const pus = document.querySelector(".logged > p > span");
    pus.innerHTML = `user: ${user.username}<br>email: ${user.email}`;
}

fetch("", { 
    method: "POST",
}).then(res => res.json())
.then(res => {
    if (res[0] == "watafac re loco") console.log("no data");
    else {
        let i = 0;
        for (let element of gallery.children) {
            const fr = document.createDocumentFragment();
            const tit = document.createElement("h3");
            const img = document.createElement("img");

            element.setAttribute("data-id", res[i].id);
            tit.textContent = res[i].name;
            img.src = "media/productImages/" + res[i].id + res[i].extension;
            img.alt = "product image";
            img.classList.add("product-image");

            fr.appendChild(tit);
            fr.appendChild(img);
            element.appendChild(fr);

            element.addEventListener("click", () => window.location.replace('/' + languaje + "/product#" + element.getAttribute("data-id")));
            i++;
        }
    }
});
