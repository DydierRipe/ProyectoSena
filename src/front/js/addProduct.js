const droppingZone = document.querySelector(".image-uploader");

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
});