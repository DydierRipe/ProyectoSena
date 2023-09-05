const itemContainer = document.querySelector('.items-container');
const pageTitle = document.querySelector('.title');

const userString = localStorage.getItem("user"); // user info

const prevDef = e => {
    if (keys[e.keyCode]) {
        e.preventDefault();
    }
}

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
                const imageContainer = document.createElement('div');
                const image = document.createElement("img");
                const info = document.createElement("div");
                const id = document.createElement("h2");
                const title = document.createElement("h2");
                const price = document.createElement("h2");
                const description = document.createElement("p");
                const buttonCont = document.createElement("div");
                const purchase = document.createElement("div");
                const deleteB = document.createElement("div");
                const span = document.createElement("span");
                const span1 = document.createElement("span");

                item.classList.add("item", "frames");
                imageContainer.classList.add('image-cont');
                image.classList.add("item-img");
                info.classList.add("product-information");
                id.classList.add("item-id");
                title.classList.add("item-title");
                price.classList.add("item-price");
                description.classList.add("item-description");
                buttonCont.classList.add("but-cont");
                purchase.classList.add("buy-button", "button");
                deleteB.classList.add("del-button", "button");

                item.setAttribute("data-id", element.id);
                image.src = "media/productImages/" + element.id + element.extension;
                id.textContent = element.id;
                title.textContent = element.name;
                price.textContent = '$' + numberWithCommas(element.price);
                description.textContent = element.description;
                span.textContent = "Purchase";
                span1.textContent = "Delete";

                purchase.addEventListener("click", () => {

                    window.onscroll = () => window.scrollTo(0, 0);

                    const fra = document.createDocumentFragment();
                    const blackScreen = document.createElement('div');
                    const error = document.createElement("p");
                    const modal = document.createElement("div");
                    const modalText = document.createElement("h2");
                    const subButton = document.createElement("div");
                    const cardNumber = document.createElement("input");
                    const expDate = document.createElement("input");
                    const clientName = document.createElement("input");
                    const cardType = document.createElement("select");
                    const cvv = document.createElement("input");
                    const adress = document.createElement("input");

                    const option = document.createElement("option");
                    const option1 = document.createElement("option");
                    const option2 = document.createElement("option");
                    const option3 = document.createElement("option");
                    const option4 = document.createElement("option");
                    const option5 = document.createElement("option");
                    const option6 = document.createElement("option");
                    const option7 = document.createElement("option");

                    blackScreen.classList.add("black-screen");
                    error.classList.add("error-messaje")
                    modal.classList.add("frames", 'modal');
                    modalText.classList.add("modal-text");
                    cardNumber.classList.add("text-space", 'card-number', "inputs");
                    expDate.classList.add("text-space", 'expires', "inputs");
                    clientName.classList.add("text-space", 'client-name', "inputs");
                    cardType.classList.add('card-type', "inputs");
                    cvv.classList.add("text-space", 'cvv', "inputs");
                    adress.classList.add("text-space", "adress", "inputs");
                    subButton.classList.add("button", "sub-button");

                    modalText.textContent = "Type your adress";
                    adress.type = cardNumber.type = expDate.type = clientName.type = cvv.type = "text";
                    adress.placeholder = "Type your adress";
                    cardNumber.placeholder = "Card number";
                    expDate.placeholder = "Expiration number";
                    clientName.placeholder = "Cardholder name";
                    cvv.placeholder = "CVV";
                    subButton.textContent = 'Submit';
                    error.textContent = "your adress must have more than 10 characters";
                    error.style.textAlign = "center";

                    option.textContent = "...Option";
                    option1.textContent = "Visa";
                    option2.textContent = "MasterCard";
                    option3.textContent = "American Exp";
                    option4.textContent = "Codensa";
                    option5.textContent = "PSE";
                    option6.textContent = "Baloto";
                    option7.textContent = "Efecty";

                    cardType.appendChild(option);
                    cardType.appendChild(option1);
                    cardType.appendChild(option2);
                    cardType.appendChild(option3);
                    cardType.appendChild(option4);
                    cardType.appendChild(option5);
                    cardType.appendChild(option6);
                    cardType.appendChild(option7);

                    blackScreen.appendChild(modal);
                    modal.appendChild(modalText);
                    modal.appendChild(error);
                    modal.appendChild(clientName);
                    modal.appendChild(expDate);
                    modal.appendChild(cardType);
                    modal.appendChild(cvv);
                    modal.appendChild(adress);
                    modal.appendChild(subButton);
                    fra.appendChild(blackScreen);
                    document.body.appendChild(blackScreen);

                    blackScreen.addEventListener("click", e => {if (e.target == blackScreen) blackScreen.remove();});

                    const buyer = () => {
                        let valid = true;
                        
                        if (clientName.value.length < 4) {
                            valid = false;
                            error.textContent = "Insert a real name";
                        }

                        if (!expDate.value.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/)) {
                            valid = false;
                            error.textContent = "Insert a real date";
                        }

                        if (cardType.value == '...Option') {
                            valid = false;
                            error.textContent = "insert a card type";
                        }

                        if (!cvv.value.match(/^\d{3,4}$/)) {
                            valid = false;
                            error.textContent = "insert a valid cvv";
                        }

                        if (adress.value.length < 4) {
                            valid = false;
                            error.textContent = "insert a real adress";
                        }

                        if (valid) {
                            subButton.removeEventListener("click", buyer);
                            fetch("/reserved", { 
                                method: "POST",
                                body: JSON.stringify({"reason": "buy", "user": JSON.parse(userString).email, "id": item.getAttribute("data-id"), "adress": adress.value}),
                                headers : { "Content-type" : "application/json" }
                            }).then(res => res.json())
                            .then(res => {
                                if (res[0] == "FE") {
                                    console.log("error lol");
                                } else {
                                    blackScreen.remove();
                                    item.remove();
                                    window.onscroll = () => {};
                                }
                            });
                        } else {
                            error.style.display = "block";
                        }
                    }
                    subButton.addEventListener("click", buyer);
                });

                deleteB.addEventListener("click", () => {
                    console.log("aaa");
                    fetch("/reserved", { 
                        method: "POST",
                        body: JSON.stringify({"reason": "delete", "user": JSON.parse(userString).email, "id": item.getAttribute("data-id")}),
                        headers : { "Content-type" : "application/json" }
                    }).then(res => res.json())
                    .then(res => {
                        if (res[0] == "FE") {
                            console.log("error lol");
                        } else {
                            item.remove();
                        }
                    });
                });

                imageContainer.appendChild(image);
                item.appendChild(imageContainer);
                item.appendChild(info);
                info.appendChild(id);
                info.appendChild(title);
                info.appendChild(price);
                info.appendChild(description);
                info.appendChild(buttonCont);
                buttonCont.appendChild(purchase);
                buttonCont.appendChild(deleteB);
                purchase.appendChild(span);
                deleteB.appendChild(span1);
                fr.appendChild(item);
                itemContainer.appendChild(fr);
            }
        }
    }
});
