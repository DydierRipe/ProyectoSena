const searchBar = document.querySelector("#search-bar");
const productChart = document.querySelector(".product-list");
const filters = document.querySelector(".filter-text");
const filtersChart = document.querySelector(".filter-container");
const tags = document.querySelectorAll("li");

let currentFilters = [];

document.addEventListener("keyup", e => {
    if (e.key == "Enter" && searchBar.value.length != 0 && searchBar === document.activeElement) {
        window.location.replace("/search" + "#" + searchBar.value);
        search();
    }

    if ((e.key == " " || e.key == "Enter") && filters === document.activeElement) {
        addFilter(filters.value);
    }
});

const search = () => {
    if (window.location.hash) {
        fetch("/search", { 
            method: "POST",
            body: JSON.stringify({"search": window.location.hash.substring(1), "filters": currentFilters}),
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

const addFilter = (filter = "") => { 
    filter = filter.trim();

    if (!filter == '' && !currentFilters.includes(filter)) {
        filters.value = '';

        const fr = document.createDocumentFragment();
        const filt = document.createElement("div");
        filt.classList.add("filter-box");
        filt.textContent = filter;
        fr.appendChild(filt);
        filtersChart.appendChild(fr);

        currentFilters.push(filter);
        search();
        
        filt.addEventListener("click", () => {
            currentFilters = currentFilters.filter(val => {if (val == filt.textContent) return false; else return true;});
            filt.remove();
            search();
        });
    }
}

tags.forEach(element => {
    element.addEventListener("click", () => {
        addFilter(element.textContent);
    });
});

search();
