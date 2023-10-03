"use strict";

const searchB = document.querySelector("#search-bar");
const titLog = document.querySelector(".tit-log");
const cart = document.querySelector(".cart");
const menu = document.querySelector(".icon");
const usIcon = document.querySelector(".user-icon");
const gal = document.querySelector(".arrow-container");


document.addEventListener("keyup", e => {
    if (searchB) {
        if (e.key == "Enter" && searchB.value.length != 0 && searchB === document.activeElement) {
            window.location.replace('/' + language + "/search" + "#" + searchB.value);
        }    
    }
});

const applyIndex = (obj) => {
    if (gal !== null) {
        obj.style.position = 'fixed';
        obj.style.top = '105px';

        for (const el of obj.children) {
            el.style.position = 'relative';
        }
    }
}

titLog.addEventListener("click", () => {
    window.location.replace('/' + language);
});

cart.addEventListener("click", () => {
    window.location.replace('/' + language + "/reserved");
});

menu.addEventListener("click", () => {
    const fr = document.createDocumentFragment();
    const list = document.createElement("ol");
    const item1 = document.createElement("li");
    const item2 = document.createElement("li");
    const item3 = document.createElement("li");
    const item4 = document.createElement("li");
    const item5 = document.createElement("li");
    const item6 = document.createElement("li");
    const item7 = document.createElement("li");

    applyIndex(list);

    list.classList.add("options");
    item1.textContent = getLangText()[0][0];
    item2.textContent = getLangText()[0][1];
    item3.textContent = getLangText()[0][2];
    item4.textContent = "Facebook";
    item5.textContent = "Instagram";
    item6.textContent = "X";
    item7.textContent = getLangText()[0][3];
    list.style.animation = "expander1 .3s forwards";


    const rem = e => {
        if (e.target != menu && e.target != list) {
            list.style.animation = "decreaser1 .3s forwards";
            setTimeout(() => list.remove(), "300");
            window.removeEventListener("click", window);   
        }
    }

    item1.addEventListener("click", () => window.location.replace('/' + language + '/creating'));
    item2.addEventListener("click", () => window.location.replace('/' + language + '/search'));
    item3.addEventListener("click", () => window.location.replace('/usersadmin'));
    item4.addEventListener("click", () => window.location.href = 'https://www.facebook.com/groups/1450191902191128/');
    item5.addEventListener("click", () => window.location.href = 'https://twitter.com/Capymusic_of?s=20');
    item6.addEventListener("click", () => window.location.href = 'https://www.instagram.com/capymusic_oficial/?hl=es');
    item7.addEventListener("click", e => rem(e));
    window.addEventListener("click", e => rem(e));

    list.appendChild(item1);
    list.appendChild(item2);
    list.appendChild(item3);
    list.appendChild(item4);
    list.appendChild(item5);
    list.appendChild(item6);
    list.appendChild(item7);
    fr.appendChild(list);
    document.body.appendChild(fr);
});

if (userString === null) {
    let langu;
    switch (language) {
        case "en":
            langu = "Not Logged";
            break;
        case "es":
            langu = "No se ha ingresado";
            break;
    }

    const pus = document.querySelector(".logged > p");
    pus.innerHTML = langu;

    usIcon.addEventListener("click", () => {
        const fr = document.createDocumentFragment();
        const list = document.createElement("ol");
        const item = document.createElement("li");
        const item2 = document.createElement("li");
        const item3 = document.createElement("li");
        
        const width = window.innerWidth;
    
        list.classList.add("options");
        item.textContent = getLangText()[0][5];
        item2.textContent = getLangText()[0][6];
        item3.textContent = getLangText()[0][3];
        list.style.animation = "expander2 .3s forwards";
    
        const rem = e => {
            if (e.target != usIcon && e.target != list) {
                list.style.animation = "decreaser2 .3s forwards";
                setTimeout(() => list.remove(), "300");
                window.removeEventListener("click", window);   
            }
        }

        item.addEventListener("click", () => {
            console.log("hola");
            window.location.replace('/' + language + '/login');
        });
        item2.addEventListener("click", () => window.location.replace('/' + language + '/signup'));
        item3.addEventListener("click", e => rem(e));
        window.addEventListener("click", e => rem(e));
    
        list.appendChild(item);
        list.appendChild(item2);
        list.appendChild(item3);
        
        applyIndex(list);
        list.style.left = (usIcon.getBoundingClientRect().left * 100 / width) + 'vw';
        fr.appendChild(list);

        document.body.appendChild(fr);
    });
} else {
    usIcon.addEventListener("click", () => {
        const fr = document.createDocumentFragment();
        const list = document.createElement("ol");
        const item1 = document.createElement("li");
        const item2 = document.createElement("li");
    
        const width = window.innerWidth;

        list.classList.add("options");
        item1.textContent = getLangText()[0][7];
        item2.textContent = getLangText()[0][3];
        list.style.animation = "expander3 .3s forwards";
        list.style.left = usIcon.getBoundingClientRect().left + 'vw';
    
        const rem = (e) => {
            if (e.target != usIcon && e.target != list) {
                list.style.animation = "decreaser3 .3s forwards";
                setTimeout(() => list.remove(), "300");
                window.removeEventListener("click", window);   
            }
        }

        item1.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.replace('/' + language + "/login");
        });
        item2.addEventListener("click", e => rem(e));
        window.addEventListener("click", e => rem(e));
    
        list.appendChild(item1);
        list.appendChild(item2);
        
        applyIndex(list);
        list.style.left = (usIcon.getBoundingClientRect().left * 100 / width) + 'vw';
        fr.appendChild(list);
        document.body.appendChild(fr);
    });
}

