const searchBar = document.querySelector("#search-bar");
const image = document.querySelector(".image");

const userString = localStorage.getItem("user"); // user info

document.addEventListener("keyup", e => {
    if (e.key == "Enter" && searchBar.value.length != 0 && searchBar === document.activeElement) {
        window.location.replace("/search" + "#" + searchBar.value);
    }
});

fetch("/product", { 
    method: "POST",
    body: JSON.stringify({"reason": "getProductData", "id": window.location.hash.replace('#', '')}),
    headers : { "Content-type" : "application/json" }
}).then(res => res.json())
.then(res => {
    if (res[0] == "FE") {
        console.log("error lol");
    } else {
        image.src = "media/productImages/" + window.location.hash.replace('#', '') + res[0].extension;
    }
});

if (userString === null) {
    const pus = document.querySelector(".logged > p");
    pus.innerHTML = "Not logged";
} else {
    const user = JSON.parse(userString);
    const pus = document.querySelector(".logged > p > span");
    pus.innerHTML = `user: ${user.username}<br>email: ${user.email}`;
}