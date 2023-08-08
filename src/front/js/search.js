const searchBar = document.querySelector("#search-bar");
const productChart = document.querySelector(".product-list");

document.addEventListener("keyup", e => {
    if (e.key == "Enter" && searchBar.value.length != 0 && searchBar === document.activeElement) {
        window.location.replace("/search" + "#" + searchBar.value);
        search();
    }
});

const search = () => {
    if (window.location.hash) {
        fetch("/search", { 
            method: "POST",
            body: JSON.stringify({"search": window.location.hash.substring(1)}),
            headers : { "Content-type" : "application/json" }
        }).then(res => res.text())
        .then(res => {
            res = JSON.parse(res);
            if (res[0] == "ERROR") console.log("error");
            else if (res[0] == "NO DATA") console.log("no data");
            else {
                for (let i = 0; i < res.length; i++) {
                    const fragment = document.createDocumentFragment();
                    const element = document.createElement("div");
                    element.classList.add("product");
                    element.textContent = res[i];
                    fragment.appendChild(element);
                    productChart.appendChild(fragment);
                }
            }
        });
    }
}

search();
