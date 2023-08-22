const droppingZone = document.querySelector(".image-uploader");
const filters = document.querySelector(".filter-text");
const filtersChart = document.querySelector(".filter-container");
const error = document.querySelectorAll(".error-messaje");

const product = {
    "name": "",
    "price": 0.0,
    "description": "",
    "intrumentType": -1,
    "image": "",
    "filters": []
}


document.addEventListener("keyup", e => {
    if ((e.key == " " || e.key == "Enter") && filters === document.activeElement) {
        if (product.filters.length < 5) {
            addFilter(filters.value.replaceAll(" ", "_"));
        } else {
            error[3].style.display = "block";
            error[3].textContent = "No more than 5 tags";
        }
    }
});

droppingZone.addEventListener("dragover", e => {
    e.preventDefault();
    droppingZone.style.border = "4px #422c65 dashed";
});

droppingZone.addEventListener("dragleave", e => {
    e.preventDefault();
    droppingZone.style.border = "4px var(--border) dashed";
});

droppingZone.addEventListener("drop", e => {
    e.preventDefault();
    droppingZone.style.border = "4px var(--border) dashed";
    if (product.image.length == 0) {
        getFile(e.dataTransfer.files[0]);
    }
});

const getFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("a")
    reader.addEventListener("load", () => {
        console.log("e")
        let url = URL.createObjectURL(file);
        const img = document.createElement("img");
        img.src = url;
        product.image = url;
        img.style.height = "300px"
        const fr = document.createDocumentFragment();
        fr.appendChild(img);
        droppingZone.firstElementChild.style.display = "none";
        droppingZone.appendChild(fr);
        droppingZone.style = "padding: 0px; width: fit-content; height: fit-content;";

        droppingZone.addEventListener("click", () => {
            img.remove();
            droppingZone.style = "";
            droppingZone.firstElementChild.style.display = "block";
            product.image = "";
        })
    });
}

const addFilter = (filter = "") => { 
    filter = filter.trim();

    if (!filter == '' && !product.filters.includes(filter)) {
        filters.value = '';

        const fr = document.createDocumentFragment();
        const filt = document.createElement("div");
        filt.classList.add("filter-box");
        filt.textContent = filter;
        fr.appendChild(filt);
        filtersChart.appendChild(fr);

        product.filters.push(filter);
        
        filt.addEventListener("click", () => {
            product.filters = product.filters.filter(val => {if (val == filt.textContent) return false; else return true;});
            filt.remove();
        });
    }
}