const itemContainer = document.querySelector('.items-container');
const pageTitle = document.querySelector('.title');

const userString = localStorage.getItem("user"); // user info

const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

if (userString === null) {
    alert("you must have an account to access this page");
    window.location.replace("/"); 
} else {
    const user = JSON.parse(userString);
    const pus = document.querySelector(".logged > p > span");
    pus.innerHTML = `user: ${user.username}<br>email: ${user.email}`;
    pageTitle.textContent = 'Items reserved by ' + user.username;
}

fetch("/reserved", { 
    method: "POST",
    body: JSON.stringify({"reason": "getReserved", "user": JSON.parse(userString).email}),
    headers : { "Content-type" : "application/json" }
}).then(res => res.json())
.then(res => {
    if (res[0] == "FE") {
        console.log("error lol");
    } else {
        if (res[0] == "no-products") itemContainer.textContent = "no items found";
        else {
            for (element of res) {
                const fr = document.createDocumentFragment();
                const item = document.createElement("div");
                const image = document.createElement("img");
                const info = document.createElement("div");
                const id = document.createElement("h2");
                const title = document.createElement("h2");
                const price = document.createElement("h2");
                const description = document.createElement("p");
                const purchase = document.createElement("div");
                const span = document.createElement("span");

                item.classList.add("item", "frames");
                image.classList.add("item-img");
                info.classList.add("product-information");
                id.classList.add("item-id");
                title.classList.add("item-title");
                price.classList.add("item-price");
                description.classList.add("item-description");
                purchase.classList.add("buy-button", "button");

                image.src = "media/productImages/" + element.id + element.extension;
                id.textContent = element.id;
                title.textContent = element.name;
                price.textContent = '$' + numberWithCommas(element.price);
                description.textContent = element.description;
                span.textContent = "Purchase";

                item.appendChild(image);
                item.appendChild(info);
                info.appendChild(id);
                info.appendChild(title);
                info.appendChild(price);
                info.appendChild(description);
                info.appendChild(purchase);
                purchase.appendChild(span);
                fr.appendChild(item);
                itemContainer.appendChild(fr);
            }
        }
    }
});
