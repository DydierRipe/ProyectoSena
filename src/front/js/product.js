const image = document.querySelector(".image");
const prName = document.querySelector(".product-name");
const price = document.querySelector(".price");
const description = document.querySelector(".description");
const filter = document.querySelector(".filter-container");
const buyButton = document.querySelector(".buy-button");
const gallery = document.querySelector(".product-gallery");

const userString = localStorage.getItem("user"); // user info

const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getData = () => {
    filter.innerHTML = '';
    fetch("/product", { 
        method: "POST",
        body: JSON.stringify({"reason": "getProductData", "id": window.location.hash.replace('#', '')}),
        headers : { "Content-type" : "application/json" }
    }).then(res => res.json())
    .then(res => {
        if (res[0] == "FE") {
            console.log("error lol");
        } else {
            let resp = res[1];
            res = res[0];

            image.src = "media/productImages/" + window.location.hash.replace('#', '') + res[0].extension;
            
            document.title = res[0].name;

            if (res[0].owner == 'no-owner') prName.textContent = res[0].name;
            else {
                prName.textContent = res[0].name;
                const fr = document.createDocumentFragment();
                const soldMes = document.createElement("span");
                soldMes.textContent = res[0].owner == JSON.parse(userString).email? " Reserved by you" : " Reserved";
                soldMes.classList.add("sold");
                fr.appendChild(soldMes);
                prName.appendChild(fr);
            }

            price.textContent = '$' + numberWithCommas(res[0].price);
            description.textContent = res[0].description;
            res[0].filters = res[0].filters.split(',');
            const fr = document.createDocumentFragment();
            res[0].filters.forEach(e => {
                const tag = document.createElement("div");
                tag.classList.add("filter-box");
                tag.textContent = e;

                fr.appendChild(tag);
            });
            filter.appendChild(fr);

            let i = 0;
            for (let element of gallery.children) {
                const fra = document.createDocumentFragment();
                const tit = document.createElement("h3");
                const img = document.createElement("img");

                element.setAttribute("data-id", resp[i].id);
                tit.textContent = resp[i].name;
                img.src = "media/productImages/" + resp[i].id + resp[i].extension;
                img.alt = "product image";
                img.classList.add("product-image");

                fra.appendChild(tit);
                fra.appendChild(img);
                element.appendChild(fra);

                element.addEventListener("click", () => window.location.replace("/product#" + element.getAttribute("data-id")));
                i++;
            }

            if (userString !== null && res[0].owner == 'no-owner') {
                buyButton.addEventListener("click", () => {
                    fetch("/product", { 
                        method: "POST",
                        body: JSON.stringify({"reason": "sellToUser", "id": window.location.hash.replace('#', ''), "user": JSON.parse(userString).email}),
                        headers : { "Content-type" : "application/json" }
                    }).then(res => res.json())
                    .then(res => {
                        if (res[0] == 'Sold') {
                            getData();
                        }
                    });
                });
            }
        }
    });
}

window.addEventListener("hashchange", () => getData());

getData();

if (userString === null) {
    const pus = document.querySelector(".logged > p");
    pus.innerHTML = "Not logged";
} else {
    const user = JSON.parse(userString);
    const pus = document.querySelector(".logged > p > span");
    pus.innerHTML = `user: ${user.username}<br>email: ${user.email}`;
}
